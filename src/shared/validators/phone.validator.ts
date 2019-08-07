import {ValidatorFn, AbstractControl} from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const phoneOk = isStrongPhone(control.value);
    return phoneOk ? null : {'phone': {value: control.value}};
  };
}

function isStrongPhone(phone: string): boolean {

  const reg = /^1[3|4|5|7|8][0-9]{9}$/;

  if (!reg.test(phone)) return false;
  return true;
}
