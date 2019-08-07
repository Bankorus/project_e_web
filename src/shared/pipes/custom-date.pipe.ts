import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'customDate' })
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: string): string {
    const dateValue = new Date(value);

    if (dateValue) {
      return super.transform(dateValue, 'yyyy-MM-dd');
    } else {
      return value;
    }
  }
}

@Pipe({ name: 'customDateTime' })
export class CustomDateTimePipe extends DatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    const dateValue = new Date(value);

    if (dateValue) {
      return super.transform(dateValue, 'yyyy-MM-dd HH:mm:ss');
    } else {
      return value;
    }
  }
}

@Pipe({ name: 'customTimePeriod' })
export class CustomTimePeriodPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    const timePeriodMap = {
      '1D': '1 day',
      '1W': '1 week',
      '1M': '1 month',
      '2M': '2 months',
      '3M': '3 months',
      '6M': '6 months',
      '1Y': '1 year',
      'ALL': 'All time'
    };
    return timePeriodMap[value.toUpperCase()] || value;
  }
}
