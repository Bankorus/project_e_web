import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
// import {RecaptchaModule} from 'ng-recaptcha';
// import {LogoModule} from '../../shared/components/logo';
import {RouterModule} from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {DirectivesModule} from '../../shared/directives/directives.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RecaptchaModule,
    RouterModule,
    // DirectivesModule,
    NgZorroAntdModule
  ],
  providers: []
})
export class LoginModule { }
