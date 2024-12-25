import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // Para ocupar un snackBar se debe inyectar la clase
  _snackBar = inject(MatSnackBar);

  // El metodo showMessage abre el snackBar que por detras lo maneja Angular Material
  showMessage(message: string, action: string = 'Cerrar', duration: number = 3000): void {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right', // Posición horizontal
      verticalPosition: 'top', // Posición vertical
    });
  }
}
