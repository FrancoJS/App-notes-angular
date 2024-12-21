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
  @Output() delete = new EventEmitter<number>();

  maxContentLength: number = 150;
  editNote() {
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
  deleteNote() {
    this._noteApiService.deleteNote(this.note.note_id).subscribe({
      next: (data) => {
        const { note } = data;
        this.delete.emit(note.note_id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
