import { NgModule } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

import { Pad2Pipe, FormatDecimalPipe, PercentWithSignPipe, FormatDecimalByCoinTypePipe } from './number.pipe';
import { CustomDatePipe, CustomDateTimePipe, CustomTimePeriodPipe } from './custom-date.pipe';


@NgModule({
  declarations: [
    Pad2Pipe,
    PercentWithSignPipe,
    CustomDatePipe,
    CustomDateTimePipe,
    CustomTimePeriodPipe,
    FormatDecimalPipe,
    FormatDecimalByCoinTypePipe
  ],
  exports: [
    Pad2Pipe,
    PercentWithSignPipe,
    CustomDatePipe,
    CustomDateTimePipe,
    CustomTimePeriodPipe,
    FormatDecimalPipe,
    FormatDecimalByCoinTypePipe
  ],
  providers: [
    DecimalPipe,
    PercentPipe,
    FormatDecimalPipe
  ]
})
export class PipesModule {}
