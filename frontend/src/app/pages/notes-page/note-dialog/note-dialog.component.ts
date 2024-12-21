import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NotesApiService } from '../../../services/api/notes-api.service';
import { IApiNoteRequest } from '../../../services/models/notes-api.interface';
@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDialogComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private _notesApiService = inject(NotesApiService);
  private _dialogRef = inject(MatDialogRef<NoteDialogComponent>);
  private _data = inject(MAT_DIALOG_DATA);
  dialogMode = this._data.mode;
  dialogTitle = this._data.title;
  note = this._data?.note;

  form = this._formBuilder.group({
    title: [this.note?.title || '', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    content: [this.note?.content || '', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
  });

  saveNote() {
    if (!this.form.valid) return;
    this._notesApiService.createNote(this.form.value as IApiNoteRequest).subscribe({
      next: (data) => {
        const { note } = data;
        this._dialogRef.close(note);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateNote() {
    if (!this.form.valid) return;
    this._notesApiService.updateNote(this.form.value as IApiNoteRequest, this.note?.note_id).subscribe({
      next: (data) => {
        const { note } = data;
        console.log(data);
        this._dialogRef.close(note);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
