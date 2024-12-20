import { Component, Input } from '@angular/core';
import { IApiNote } from '../../../services/models/notes-api.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() note!: IApiNote;

  maxContentLength: number = 100;
  editNote() {
    console.log('Actualizar nota');
  }
  deleteNote() {
    console.log('Eliminar nota');
  }
}
