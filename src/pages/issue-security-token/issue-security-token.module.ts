import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueSecurityTokenComponent } from './issue-security-token.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule
  ],
  providers: [],
  declarations: [IssueSecurityTokenComponent]
})
export class IssueSecurityTokenModule { }
