import { Component, inject, OnInit } from '@angular/core';
import { NotesApiService } from '../../services/api/notes-api.service';
import { NoteComponent } from './note/note.component';
import { IApiNote } from '../../services/models/notes-api.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [NoteComponent, MatButtonModule, MatIconModule],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent implements OnInit {
  private _notesApiService = inject(NotesApiService);
  notes: IApiNote[] = [];
  ngOnInit(): void {
    this._notesApiService.getNotes().subscribe({
      next: (data) => {
        this.notes = data.notes.slice().reverse();
        console.log(this.notes);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
