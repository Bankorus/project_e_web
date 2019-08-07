import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhitelistComponent } from './whitelist.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AppAlertModule} from '../../shared/components/app-alert/app-alert.module';

@NgModule({
  imports: [
    CommonModule,
    // AppAlertModule
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [WhitelistComponent]
})
export class WhitelistModule { }
