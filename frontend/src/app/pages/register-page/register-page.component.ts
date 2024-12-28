import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import {
  crossPasswordValidator,
  passwordCustomValidator,
  PasswordStateMatcher,
} from '../../shared/validators/password-custom-validators';

import { IApiRegisterRequest } from '../../services/models/user-api.iterface';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/api/auth-api.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private _authApiService = inject(AuthApiService);
  private _router = inject(Router);
  private _snackBarService = inject(SnackbarService);

  // Se instancia una clase ya definida que permite ver si el formulario tiene el error crossPasswordValidator
  passwordStateMatcher = new PasswordStateMatcher();

  form = this._formBuilder.group(
    {
      username: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9_]{5,50}$/)],
      ],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, passwordCustomValidator]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: crossPasswordValidator },
    // crossPasswordValidator es un validador personalizado que verifica que las contraseñas sean iguales
  );

  clickRegister(): void {
    if (this.form.valid) {
      const { confirmPassword, ...data } = this.form.value;
      this._authApiService.registerUser(data as IApiRegisterRequest).subscribe({
        next: (data) => {
          const { username } = data.user;
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token);
          this._router.navigateByUrl('/notes');
        },
        error: (err) => {
          console.log(err);
          this._snackBarService.showMessage('¡El usuario ya se encuentra registrado!', 'Cerrar', 3000);
        },
      });
    }
  }

  get usernameField(): FormControl<string> {
    return this.form.controls.username;
  }

  get emailField(): FormControl<string> {
    return this.form.controls.email;
  }
  get passwordField(): FormControl<string> {
    return this.form.controls.password;
  }

  get confirmPasswordField(): FormControl<string> {
    return this.form.controls.confirmPassword;
  }
}
