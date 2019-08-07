import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [FaqComponent]
})
export class FaqModule { }
