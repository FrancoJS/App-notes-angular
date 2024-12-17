import { AbstractControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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

export const crossPasswordValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>,
): ValidationErrors | null => {
  const password = formGroupControl.value?.password;
  const confirmPassword = formGroupControl.value?.confirmPassword;
  return password === confirmPassword ? null : { crossPasswordValidator: true };
};

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl, form: NgForm): boolean {
    if (!control || !control.parent) return false;

    return control.parent.hasError('crossPasswordValidator');
  }
}
