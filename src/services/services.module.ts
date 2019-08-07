import { NgModule, ModuleWithProviders } from '@angular/core';

import { ApiService } from './api.service';
import {NavigationService} from './navigation.service';
import {BaseService} from './base.service';
import {UserService} from './user.service';
import {CommonService} from './common.service';
import {BlockchainService} from './blockchain.service';
import {MetamaskService} from './metamask.service';
import {MediaService} from './media.service';

@NgModule({})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        BaseService,
        ApiService,
        NavigationService,
        UserService,
        CommonService,
        BlockchainService,
        MetamaskService,
        MediaService
      ]
    };
  }
}
