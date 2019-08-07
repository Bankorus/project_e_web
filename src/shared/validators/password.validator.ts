import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const passwordOk = isStrongPassword(control.value);
    return passwordOk ? null : {'password': {value: control.value}};
  };
}

function isStrongPassword(password: string): boolean {
  const upperCaseReg = /[A-Z]/;
  const lowerCaseReg = /[a-z]/;
  const digitReg = /[0-9]/;
  if (!upperCaseReg.test(password)) return false;
  if (!lowerCaseReg.test(password)) return false;
  if (!digitReg.test(password)) return false;
  return true;
}