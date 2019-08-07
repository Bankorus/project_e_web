import { ValidatorFn, AbstractControl } from '@angular/forms';

export function withdrawLimitValidator(total, max): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (control.value * 1 > total * 1) {
        return {'notEnough': {value: control.value}};
      } else if (control.value * 1 > max * 1) {
        return {'maxLimit': {value: control.value}};
      } else {
        return null;
      }
    };
}
