import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IApiNote } from '../../../services/models/notes-api.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotesApiService } from '../../../services/api/notes-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { Output, EventEmitter } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() note!: IApiNote;
  private _noteApiService = inject(NotesApiService);
  private _dialog = inject(MatDialog);
  private _token = localStorage.getItem('token')!;
  private _snackBarService = inject(SnackbarService);
  @Output() delete = new EventEmitter<{ note_id: number; totalNotes: number | undefined }>();

  editNote(): void {
    const dialogRef = this._dialog.open(NoteDialogComponent, {
      data: {
        mode: 'edit',
        title: 'Editar nota',
        note: this.note,
      },
    });

    dialogRef.afterClosed().subscribe((note: IApiNote) => {
      if (!note) return;
      this.note = note;
    });
  }
  deleteNote(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Eliminar nota',
        message: '¿Seguro que desea eliminar la nota?',
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this._noteApiService.deleteNote(this.note.note_id, this._token).subscribe({
        next: (data) => {
          const { note, totalNotes } = data;
          this._snackBarService.showMessage('¡Nota eliminada con exito!', 'Cerrar', 3000);
          this.delete.emit({
            note_id: note.note_id,
            totalNotes,
          });
        },
        error: () => {
          this._snackBarService.showMessage('¡No se pudo eliminar la nota!', 'Cerrar', 3000);
        },
      });
    });
  }
}
