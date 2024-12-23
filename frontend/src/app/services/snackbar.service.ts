import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  _snackBar = inject(MatSnackBar);

  showMessage(message: string, action: string = 'Cerrar', duration: number = 3000): void {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right', // Posición horizontal
      verticalPosition: 'top', // Posición vertical
    });
  }
}
