import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsServiceComponent } from './terms-service.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [TermsServiceComponent]
})
export class TermsServiceModule { }
