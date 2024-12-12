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
import { AuthApiService } from '../../services/api/auth-api.service';
import { IApiLoginRequest } from '../../services/api/models/user-api.iterface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIcon, ReactiveFormsModule],
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
  private _authApiService = inject(AuthApiService);

  form = this._formBuilder.nonNullable.group({
    // nonNullable es un atributo que hace que los controles sean obligatorios
    email: ['admin1@admin.com', [Validators.required, Validators.email]],
    password: ['AbcD1234*', [Validators.required, passwordCustomValidator]],
  });

  // data = this.form.value;
  clickLogin(): void {
    if (this.form.valid) {
      this._authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          const { error } = err;
          console.log(error);
        },
      });
    }
  }

  get emailField(): FormControl<string> {
    return this.form.controls.email;
  }
  get passwordField(): FormControl<string> {
    return this.form.controls.password;
  }
}
