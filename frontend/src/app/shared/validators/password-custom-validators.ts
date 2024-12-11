import { AbstractControl, ValidationErrors } from '@angular/forms';
// AbstractControl es la clase padre de FormControl, FormArray, FormGroup
const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');
export const passwordCustomValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (!value) return null;

  if (!patternPassword.test(value)) {
    return { passwordValidator: true };
  }

  return null;
};
