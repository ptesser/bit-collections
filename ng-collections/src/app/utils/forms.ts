import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function markAllAsTouched(x: AbstractControl, onlySelf = false) {
  if (x instanceof FormGroup) {
    for (const name of Object.keys(x.controls)) {
      markAllAsTouched(x.controls[name], true);
    }
  } else if (x instanceof FormArray) {
    for (const c of x.controls) {
      markAllAsTouched(c, true);
    }
  }
  x.markAsTouched({ onlySelf });
}
