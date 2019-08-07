import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {environment} from '../environments/environment';

@Injectable()
export class ApiService extends BaseService {

  prefix: string = environment.apiUrl + '/api';

}
