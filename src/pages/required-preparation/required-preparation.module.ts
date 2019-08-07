import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredPreparationComponent } from './required-preparation.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImgBoxModule} from '../../shared/components/img-box';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ImgBoxModule,
  ],
  declarations: [RequiredPreparationComponent]
})
export class RequiredPreparationModule { }
