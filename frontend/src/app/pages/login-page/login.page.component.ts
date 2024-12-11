import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormGroup, // clase para crear un formulario
  FormControl, // clase para crear un control
  Validators,
  FormBuilder,
} from '@angular/forms';
import { passwordCustomValidator } from '../../shared/validators/password-custom-validators';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss',
})
export class LoginPageComponent {
  // form = new FormGroup({
  //   // forma de crear un formulario antigua
  //   username: new FormControl('', { validators: [Validators.required] }),
  //   password: new FormControl('', { validators: [Validators.required] }),
  // });

  private readonly _formBuilder = inject(FormBuilder);

  form = this._formBuilder.nonNullable.group({
    // nonNullable es un atributo que hace que los controles sean obligatorios
    // forma de crear un formulario moderna
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordCustomValidator]],
  });

  clickLogin(): void {
    console.log(this.passwordField.errors);
  }

  // getters para obtener email y password del formulario
  get emailField(): FormControl<string> {
    return this.form.controls.email;
  }
  get passwordField(): FormControl<string> {
    return this.form.controls.password;
  }
}
