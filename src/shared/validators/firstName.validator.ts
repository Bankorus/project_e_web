import {ValidatorFn, AbstractControl} from '@angular/forms';

export function firstNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const nameOk = isStrongFirstName(control.value);
    return nameOk ? null : {'firstname': {value: control.value}};
  };
}

function isStrongFirstName(firstname: string): boolean {

  const reg = /^[A-Za-z]+$/;

  // return reg.test(firstname);
  //
  if (!reg.test(firstname)) return false;
  return true;
}
