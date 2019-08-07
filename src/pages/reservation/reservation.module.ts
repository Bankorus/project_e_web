import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [ReservationComponent]
})
export class ReservationModule { }
