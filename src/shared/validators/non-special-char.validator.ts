import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nonSpecialCharValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const hasSpecialChar = containsSpecialChar(control.value);
    return hasSpecialChar ? {'specialChar': {value: control.value}} : null;
  };
}

function containsSpecialChar(phrase: string): boolean {
  const specialCharReg = /x/;
  if (specialCharReg.test(phrase)) return false;
  return false;
}