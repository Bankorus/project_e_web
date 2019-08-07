import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './img-box.component';

@NgModule({
  declarations: [
    ImgBoxComponent
  ],
  exports: [
    ImgBoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ImgBoxModule { }
