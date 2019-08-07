import { Observable, BehaviorSubject } from 'rxjs-compat';
import {Headers, Http, RequestOptions, Response, ResponseContentType} from '@angular/http';
import {Injectable, NgZone} from '@angular/core';
import { ApiService } from './api.service';
import {NavigationService} from './navigation.service';
import {BaseService} from './base.service';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {
  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  responseType: ResponseContentType;

  prefix = environment.apiUrl + '/api/files';

  constructor(private apiService: ApiService,
              private http: Http,
              private navigationSvc: NavigationService,
              private ngZone: NgZone,
              private baseSvc: BaseService
  ) {
    if (apiService.getUserToken() != null) {
      this.loginStatus.next(true);
    }
  }

  register(email: string, password: string, last_name: string, first_name: string, areacode: string, phonenum: string) {
    const postObj = {
      email,
      password,
      last_name,
      first_name,
      areacode,
      phonenum,
      // hear_from
    };
    return this.apiService.postJSON('/users/register/', postObj).then((res) => {
      // console.log(res);
      return res;
    });
  }

  loginCallback(obj: any) {
    this.apiService.setUserToken(obj.token);
    this.apiService.setUserEmail(obj.email);
    this.apiService.setUserName(obj.first_name);
    this.apiService.setUserStatus(obj.reserved);
    this.loginStatus.next(true);
  }

  isLogin(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  login(email: string, password: string) {
    const postObj = {
      email,
      password
    };
    return this.apiService.postJSON('/users/login/', postObj).then((res) => {
      this.checkNeedVerify(res);
      return res;
    });
  }

  logout (goLogin: boolean = true) {
    this.apiService.postJSON('/users/logout/', {} ).then((res) => {
      this.loginStatus.next(false);
      this.apiService.clearUserToken();
      this.apiService.clearUserEmail();
      this.apiService.clearUserName();
      this.apiService.clearUserStatus();
      if (goLogin) {
        this.navigationSvc.toLogin();
      }
    });
  }

  checkNeedVerify(obj) {
    if (obj['otp_enabled']) {
      this.ngZone.run(() => {
        // this.navigationSvc.toTwoStepVerifyLogin(obj.token);
      });
    } else {
      this.ngZone.run(() => {
        this.loginCallback(obj);
        if (obj['reserved'] === true) {
          this.navigationSvc.toReservation();
        } else {
          this.navigationSvc.toGainDemandsPage();
        }
      });
    }
  }

  getUserProfile() {
    return this.apiService.getJSON('/users/user_profile/');
  }

  gainDemands(company_name: string, jurisdiction: string, business_desc: string, have_counsel: boolean, counsel: string, raise_range: string, raised_other: boolean, how_soon: string, raise_area: string, budget: string) {
    const obj = {
      company_name,
      jurisdiction,
      business_desc,
      have_counsel,
      counsel,
      raise_range,
      raised_other,
      how_soon,
      raise_area,
      budget
    };
    return this.apiService.postJSON('/users/user_reserve/', obj).then((res) => {
      return res;
    });
  }

  recoverPwdSendMail(email: string) {
    const obj = {
      email
    };
    return this.apiService.postJSON('/users/password_reset/', obj).then((res) => {
      return res;
    });
  }

  resetPassword(token: string, password: string, confirm_password: string) {
    const obj = {
      password,
      confirm_password
    };
    this.apiService.setUserToken(token);
    return this.apiService.postJSON('/users/password_reset/change_password/', obj).then((res) => {
      return res;
    });
  }

  uploadFile(infoObj: any) {
    const options = this.prepareRequestOptions();
    const formData = this.composeFormData(infoObj);
    return this.http.post( this.prefix + '/required-preparas/', formData, options).toPromise();
  }

  importFile(infoObj: any) {
    const options = this.prepareRequestOptions();
    const formData = this.composeFormData(infoObj);
    return this.http.post( this.prefix + '/parse-csv/', formData, options).toPromise();
  }

  prepareRequestOptions() {
    const headers = new Headers();
    const token = this.baseSvc.getUserToken();
    headers.append('Authorization', token);
    const options = new RequestOptions({headers: headers});
    return options;
  }


  composeFormData = (infoObj: any): FormData => {
    const formData = new FormData();
    for (const k in infoObj) {
      if (infoObj.hasOwnProperty(k)) {
        formData.append(k, infoObj[k]);
      }
    }
    return formData;
  }

  removeFile(id: number) {
    return this.apiService.deleteJSON(`/files/required-preparas/${id}/`);
  }

  getUploadFile() {
    return this.apiService.getJSON('/files/required-preparas/');
  }

  submitUploadInfo(bref_info, range_category, extra_info) {
    const obj = {
      bref_info,
      range_category,
      extra_info
    };
    return this.apiService.postJSON('/required-preparas/', obj).then((res) => {
      return res;
    });
  }

  getUploadInfo() {
    return this.apiService.getJSON('/required-preparas/');
  }

  overdueResend(email) {
    const obj = {
      email
    };
    return this.apiService.postJSON('/users/resend-active-mail', obj).then((res) => {
      return res;
    });
  }

}
