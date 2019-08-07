import { ValidatorFn, AbstractControl } from '@angular/forms';

export function numberTypeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const reg =  /^(\d+|\d+\.\d+|\.\d+)$/;
        const isOk = reg.test(control.value);
        return isOk ? null : {'numberTypeValid': {value: control.value}};
    };
}
