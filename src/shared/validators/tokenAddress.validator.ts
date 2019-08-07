import {ValidatorFn, AbstractControl} from '@angular/forms';

export function tokenAddressValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const ok = isValid(control.value);
    return ok ? null : {'tokenAddress': {value: control.value}};
  };
}

function isValid(str: string): boolean {
  const reg = /^[a-zA-Z0-9]+$/
  if (!reg.test(str)) return false;
  return true;
}
