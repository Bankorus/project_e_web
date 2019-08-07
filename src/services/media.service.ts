import {Injectable} from '@angular/core';
import {ResponseContentType} from '@angular/http';

import {BaseService} from './base.service';

@Injectable()
export class MediaService extends BaseService {

  responseType: ResponseContentType = ResponseContentType.Blob;
  appendSlash: boolean = false;

}
