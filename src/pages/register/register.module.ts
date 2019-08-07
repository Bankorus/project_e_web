import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register.component';
// import { RecaptchaModule } from 'ng-recaptcha';
import {RouterModule} from '@angular/router';
// import {DirectivesModule} from '../../shared/directives/directives.module';
// import {EmailNotificationModule} from '../../shared/components/email-notification';
import { RegisterVerfifyComponent } from './register-verfify/register-verfify.component';
// import {VerificationCodeModule} from '../../shared/components';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RecaptchaModule,
    RouterModule,
    // DirectivesModule,
    // EmailNotificationModule,
    // VerificationCodeModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [RegisterComponent, RegisterVerfifyComponent],
  exports: [RegisterComponent,  RegisterVerfifyComponent]
})
export class RegisterModule { }
