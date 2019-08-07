import { ValidatorFn, AbstractControl } from '@angular/forms';

export function valueValidValidator(arr:any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const isOk = arr.indexOf(control.value) !== -1
        return isOk ? null : {'valueValid': {value: control.value}};
    };
}
