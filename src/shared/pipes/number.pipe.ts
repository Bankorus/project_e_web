import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Pipe({ name: 'pad2' })
export class Pad2Pipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    } else if (value >= 10) {
      return value.toString();
    } else {
      return '0' + value;
    }
  }
}

@Pipe({ name: 'formatDecimal' })
export class FormatDecimalPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: string, fractionDigits = 8): string {
    let num = parseFloat(value);
    if (isNaN(num)) {
      return value;
    } else {
      let multiplier =  Math.pow(10, fractionDigits);
      num = Math.floor(num * multiplier) / multiplier;
      return this.decimalPipe.transform(num, `1.${fractionDigits}-${fractionDigits}`);
    }
  }
}

@Pipe({ name: 'percentWithSign'})
export class PercentWithSignPipe implements PipeTransform {
  constructor(private percentPipe: PercentPipe) {}

  transform(value: string, options: any): string {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return value;
    } else {
      const sign = num > 0 ? '+' : '';
      return sign + this.percentPipe.transform(num, options);
    }
  }
}

@Pipe({ name: 'formatDecimalByCoinType' })
export class FormatDecimalByCoinTypePipe implements PipeTransform {
  constructor(private decimalPipe: FormatDecimalPipe) {}

  transform(value: string, coinType: string = 'USDT') {
    if(coinType === 'BTC') {
      return this.decimalPipe.transform(value, 6);
    } else {
      // default to USDT
      return this.decimalPipe.transform(value, 2);
    }
  }
}
