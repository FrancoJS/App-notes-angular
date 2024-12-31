import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NotesApiService } from '../../../services/api/notes-api.service';
import { IApiNoteRequest } from '../../../services/models/notes-api.interface';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormField, MatError, MatLabel, MatInput, MatButton, MatCard],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDialogComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private _notesApiService = inject(NotesApiService);
  // Se debe guardar una referencia al Dialog ya que debe vincularse de alguna manera
  private _dialogRef = inject(MatDialogRef<NoteDialogComponent>);
  // injection Token de Angular materual que nos sirve para obtener los datos que nos manda el que abre el dialog
  private _data = inject(MAT_DIALOG_DATA);
  private _token = localStorage.getItem('token')!;
  dialogMode = this._data.mode;
  dialogTitle = this._data.title;
  note = this._data?.note;
  private _snackBarService = inject(SnackbarService);

  form = this._formBuilder.group({
    title: [this.note?.title || '', [Validators.required, Validators.maxLength(50)]],
    content: [this.note?.content || '', [Validators.required, Validators.maxLength(150)]],
  });

  saveNote() {
    if (!this.form.valid) return;
    this._notesApiService.createNote(this.form.value as IApiNoteRequest, this._token).subscribe({
      next: (data) => {
        const { note, totalNotes } = data;
        this._snackBarService.showMessage('¡Nota creada con exito!', 'Cerrar', 3000);
        this._dialogRef.close({ note, totalNotes });
      },
      error: (err) => {
        this._snackBarService.showMessage('¡No se pudo crear la nota!', 'Cerrar', 3000);
      },
    });
  }

  updateNote() {
    if (!this.form.valid) return;
    // Se tiene que convertir el tipo de form value para que el compilador trate al valor como si fuera de tipo IApiNoteRequest
    this._notesApiService.updateNote(this.form.value as IApiNoteRequest, this.note?.note_id, this._token).subscribe({
      next: (data) => {
        const { note } = data;
        this._snackBarService.showMessage('¡Nota actualizada con exito!', 'Cerrar', 3000);
        this._dialogRef.close(note);
      },
      error: (err) => {
        this._snackBarService.showMessage('¡No se pudo actualizar la nota!', 'Cerrar', 3000);
      },
    });
  }

  get titleField(): FormControl<string> {
    return this.form.controls.title;
  }
  get contentField(): FormControl<string> {
    return this.form.controls.content;
  }
}
