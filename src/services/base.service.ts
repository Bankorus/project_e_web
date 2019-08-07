import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Subject} from 'rxjs-compat';
import {CookieService} from 'ngx-cookie-service';

import {environment} from '../environments/environment';

const USER_TOKEN = 'USER_TOKEN';
const USER_EMAIL = 'USER_EMAIL';
const USER_NAME = 'USER_NAME';
const USER_STATUS = 'USER_STATUS';

const COOKIE_PATH = '/';
const COOKIE_DOMAIN = environment.cookieDomain;

let user_token = null;

export const UnauthorizationSubject = new Subject();
export const ServerErrorSubject = new Subject();

@Injectable()
export class BaseService {

  prefix = '';
  appendSlash = true;
  responseType: ResponseContentType;
  jsonHeaders: any = {
    'Content-Type': 'application/json',
  };

  constructor(
    protected http: Http,
    protected cookieService: CookieService
  ) {
  }

  public setUserToken(token: string) {
    user_token = 'token ' + token;
    this.setCookieItem(USER_TOKEN, user_token);
  }

  public setUserEmail(email: string) {
    this.setCookieItem(USER_EMAIL, email);
  }

  public setUserName(name: string) {
    this.setCookieItem(USER_NAME, name);
  }

  public setUserStatus(status: string) {
    this.setCookieItem(USER_STATUS, status);
  }

  private getDomain() {
    let domain = COOKIE_DOMAIN;
    if (document.domain === 'localhost') {
      domain = document.domain;
    }

    return domain;
  }

  private setCookieItem(name: string, value: string) {
    this.cookieService.set(name, value, null, COOKIE_PATH, this.getDomain());
  }

  public clearUserToken() {
    this.clearCookieItem(USER_TOKEN);
    user_token = null;
  }

  public clearUserEmail() {
    this.clearCookieItem(USER_EMAIL);
  }

  public clearUserName() {
    this.clearCookieItem(USER_NAME);
  }

  public clearUserStatus() {
    this.clearCookieItem(USER_STATUS);
  }

  private clearCookieItem(name: string) {
    this.cookieService.delete(name, COOKIE_PATH, this.getDomain());
  }

  public getUserToken() {
    if (user_token) {
      return user_token;
    }

    return this.getCookieItem(USER_TOKEN);
  }

  public getUserEmail() {
    return this.getCookieItem(USER_EMAIL);
  }

  public getUserName() {
    return this.getCookieItem(USER_NAME);
  }

  public getUserStatus() {
    return this.getCookieItem(USER_STATUS);
  }

  private getCookieItem(name: string) {
    const value = this.cookieService.get(name);
    if (value) {
      return value;
    }

    return null;
  }

  private getUrl(path: string) {
    function appendPath(_path: string) {
      if (_path && _path.length > 0 && _path[_path.length - 1] !== '/') {
        _path += '/';
      }
      return _path;
    }

    if (this.appendSlash) {
      let queryIndex = -1;
      if (path) {
        queryIndex = path.indexOf('?');
      }

      if (queryIndex > -1) {
        path = appendPath(path.substr(0, queryIndex)) + path.substr(queryIndex);
      } else {
        path = appendPath(path);
      }
    }

    return this.prefix + path;
  }

  private handleError(res: Response | any) {

    let error_code = 'app_unknown';
    let error_msg = '';
    let error_fields = null;
    let error_context = {};
    if (res instanceof Response) {
      if (res.status === 401) {
        // Unauthorization
        this.clearUserToken();
        this.clearUserEmail();
        UnauthorizationSubject.next(res);
      } else if (res.status === 500) {
        // server unhandled error
        error_code = 'app_service_error';
        error_msg = 'Server error, please contact system administrator.';
        console.log('Service: got 500 error, please look backend server');
        ServerErrorSubject.next({errorMsg: error_msg});
      }

      const contentType = res.headers.get('content-type');
      if (contentType === 'application/json') {
        const result = res.json();
        if (result.error_code) {
          error_code = result.error_code;
        }
        if (result.error_msg) {
          error_msg = result.error_msg;
        }
        if (result.err_fields) {
          error_fields = result.err_fields;
        }
        if (result.error_context) {
          error_context = result.error_context;
        }
      }

    }
    return Promise.reject({
      http_status: res.status,
      error_code,
      error_msg,
      error_fields,
      error_context
    });
  }

  get(path: string): Promise<any> {
    const url = this.getUrl(path);
    const token = this.getUserToken();

    const headers = new Headers();
    token && headers.append('Authorization', token);
    let options = new RequestOptions({headers: headers});
    if (this.responseType) {
      options.responseType = this.responseType;
    }
    return this.http.get(url, options).toPromise().catch((res) => {
      return this.handleError(res);
    });
  }

  getJSON(path: string): Promise<any> {
    return this.get(path).then((res) => res.json());
  }

  doMethod(method: string, path: string, body: any, headers?: any): Promise<any> {

    const url = this.getUrl(path);

    const httpHeaders = {};

    if (headers) {
      Object.assign(httpHeaders, headers);
    }

    const token = this.getUserToken();

    if (token) {
      Object.assign(httpHeaders, {'Authorization': token});
    }

    const options = new RequestOptions({headers: new Headers(httpHeaders)});

    return this.http[method](url, body, options).toPromise().catch((res) => {
      return this.handleError(res);
    });
  }

  putJSON(path: string, body: any): Promise<any> {
    return this.doMethod('put', path, body, this.jsonHeaders).then(this.parseJSON, this.logError);
  }

  postJSON(path: string, body: any): Promise<any> {
    return this.doMethod('post', path, body, this.jsonHeaders).then(this.parseJSON, this.logError);
  }

  deleteJSON(path: string): Promise<any> {
    const url = this.getUrl(path);
    const httpHeaders = {};
    const token = this.getUserToken();
    if (token) {
      Object.assign(httpHeaders, { 'Authorization': token });
    }
    const options = new RequestOptions({ headers: new Headers(httpHeaders) });
    return this.http.delete(url, options).toPromise().catch((res) => {
      return this.handleError(res);
    });
  }

  parseJSON(res: Response) {
    const text = res.text();
    const hasText = text != null && text.length > 0;
    return hasText ? res.json() : {};
  }

  logError(res) {
    console.error(res);
    return Promise.reject(res);
  }

}
