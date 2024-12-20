import { Component, inject, OnInit } from '@angular/core';
import { NotesApiService } from '../../services/api/notes-api.service';
import { NoteComponent } from './note/note.component';
import { IApiNote } from '../../services/models/notes-api.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [NoteComponent, MatButtonModule, MatIconModule],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent implements OnInit {
  private _notesApiService = inject(NotesApiService);
  private _dialog = inject(MatDialog);
  notes: IApiNote[] = [];
  ngOnInit(): void {
    this._notesApiService.getNotes().subscribe({
      next: (data) => {
        this.notes = data.notes.slice().reverse();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialog() {
    const diaglogRef = this._dialog.open(NoteDialogComponent);
    diaglogRef.afterClosed().subscribe((note: IApiNote) => {
      this.notes.unshift(note);
    });
  }
}
