import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { passwordCustomValidator } from '../../shared/validators/password-custom-validators';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIcon, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);

  form = this._formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9_]{5,50}$/)],
    ],
    email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
    password: ['', [Validators.required, passwordCustomValidator]],
    confirmPassword: ['', [Validators.required, passwordCustomValidator]],
  });

  clickRegister(): void {
    console.log('Boton funcionando');
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
}
