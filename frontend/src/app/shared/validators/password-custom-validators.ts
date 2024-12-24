import { AbstractControl, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// AbstractControl es la clase padre de FormControl, FormArray, FormGroup
const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');

// Funcion para validar la contraseña esta es de tipo Validador asi que como parametro recibe un AbstractControl que es la clase padre de FormControl, FormArray, FormGroup y debe retornar el error o null
export const passwordCustomValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  if (!patternPassword.test(value)) {
    return { passwordValidator: true };
  }

  return null;
};

// Es una validacion del formulario que accede a los controles del formulario y verifica que las contraseñas sean iguales
export const crossPasswordValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>,
): ValidationErrors | null => {
  const password = formGroupControl.value?.password;
  const confirmPassword = formGroupControl.value?.confirmPassword;
  return password === confirmPassword ? null : { crossPasswordValidator: true };
};

// Clase que implementa la interfaz ErrorStateMatcher esta tiene un metodo que nos permite verificar si un control tiene un error, el if lo que hace es que verifica que exista un control y si el control tiene un padre, este devuelve true o false si el padre del control tiene el error crossPasswordValidator
export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl, form: NgForm): boolean {
    if (!control || !control.parent) return false;

    return control.parent.hasError('crossPasswordValidator');
  }
}
