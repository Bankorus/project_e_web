import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegIntroductionComponent } from './reg-introduction.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule
  ],
  declarations: [RegIntroductionComponent]
})
export class RegIntroductionModule { }
