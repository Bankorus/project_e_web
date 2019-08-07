import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
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
  declarations: [RecoverPasswordComponent]
})
export class RecoverPasswordModule { }
