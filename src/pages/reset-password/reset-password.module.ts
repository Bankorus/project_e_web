import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
