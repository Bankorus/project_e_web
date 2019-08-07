import {ValidatorFn, AbstractControl} from '@angular/forms';

export function lastNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const nameOk = isStrongPassword(control.value);
    return nameOk ? null : {'lastname': {value: control.value}};
  };
}

function isStrongPassword(lastname: string): boolean {

  const reg = /^[a-zA-Z]+$/;

  if (!reg.test(lastname)) return false;
  return true;
}
