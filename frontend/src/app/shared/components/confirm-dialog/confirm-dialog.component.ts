import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  private _data = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  dialogTitle = this._data.title;
  dialogMessage = this._data.message;

  confirmDelete() {
    this._dialogRef.close(true);
  }
}
