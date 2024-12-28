import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormControl, // clase para crear un control
  Validators,
  FormBuilder,
} from '@angular/forms';
RouterLink;
import { passwordCustomValidator } from '../../shared/validators/password-custom-validators';
import { IApiLoginRequest } from '../../services/models/user-api.iterface';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/api/auth-api.service';
import { SnackbarService } from '../../services/snackbar.service';

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
    RouterLink,
  ],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss',
})
export class LoginPageComponent {
  // Inyeccion de dependencias (servicios)
  // Router permite la navegacion entre los componentes de la aplicacion en funcion de las rutas definidas en app.routes.js
  private readonly _router = inject(Router);
  // FormBuilder es una clase que nos permite crear formularios, nos abstrae de crear las instancias de manera manual
  private readonly _formBuilder = inject(FormBuilder);
  // Servicio de autenticacion creado por mi, permite acceder a hacer peticiones al backend de autenticacion y creacion de usuario
  private _authApiService = inject(AuthApiService);

  private _snackBarService = inject(SnackbarService);

  form = this._formBuilder.nonNullable.group({
    // nonNullable es un atributo que hace que los controles sean obligatorios
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordCustomValidator]],
  });

  clickLogin(): void {
    // Si el formulario es valido, realiza la peticion a la api del backend
    if (this.form.valid) {
      // Nos suscribimos a la peticion ya que HttpClient maneja las solicitudes con Observables
      this._authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
        // Si la peticion es exitosa, se ejecuta este callback y se pueden acceder a los datos que devuelve el servidor
        next: (response) => {
          const { username } = response.user;
          // Guardamos el token y el username en el localStorage
          localStorage.setItem('username', username);
          localStorage.setItem('token', response.token);
          // Navegamos a la pagina de notas
          this._router.navigateByUrl('/notes');
        },
        error: (err) => {
          this._snackBarService.showMessage('¡Usuario o contraseña incorrectos!', 'Cerrar', 3000);
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
