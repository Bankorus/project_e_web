import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AppFooterComponent
  ],
  declarations: [AppFooterComponent]
})
export class AppFooterModule { }
