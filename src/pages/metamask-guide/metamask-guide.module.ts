import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetamaskGuideComponent } from './metamask-guide.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [MetamaskGuideComponent]
})
export class MetamaskGuideModule { }
