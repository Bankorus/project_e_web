import {ValidatorFn, AbstractControl} from '@angular/forms';

export function areaCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const codeOk = isStrongAreaCode(control.value);
    return codeOk ? null : {'code': {value: control.value}};
  };
}

function isStrongAreaCode(code) {

  const reg = /[0-9]/;

  if (!reg.test(code)) return false;
  return true;
}
