import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const emailOk = isEmailValid(control.value);
    return emailOk ? null : {'email': {value: control.value}};
  };
}

function isEmailValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const length = email.length <= 25;
  return re.test(String(email).toLowerCase()) && length;
}
