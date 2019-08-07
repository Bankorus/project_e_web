import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GainDemandsComponent } from './gain-demands.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [GainDemandsComponent]
})
export class GainDemandsModule { }
