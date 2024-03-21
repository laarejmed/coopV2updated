import {FormControl, ValidationErrors} from '@angular/forms';

/* export class CoopValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return {notOnlyWhiteSpace: true};
    } else {
      return null;
    }
  }
}
*/
export class CoopValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value == null && control.value.trim().length === 0) {
      return { notOnlyWhiteSpace: true };
    }
    return null;
  }
}
