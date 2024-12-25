import { Component, inject, OnInit } from '@angular/core';
import { NotesApiService } from '../../services/api/notes-api.service';
import { NoteComponent } from './note/note.component';
import { IApiNote } from '../../services/models/notes-api.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [NoteComponent, MatButtonModule, MatIconModule, NavbarComponent, MatPaginatorModule],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent implements OnInit {
  private _notesApiService = inject(NotesApiService);
  // Para ocupar un Dialog de Angular Material se debe inyectar la clase MatDialog
  private _dialog = inject(MatDialog);
  private _token = localStorage.getItem('token');
  private _snackBarService = inject(SnackbarService);
  username = localStorage.getItem('username');
  notes: IApiNote[] = [];
  totalNotes!: number;
  limit!: number;

  pageEvent?: PageEvent;
  ngOnInit(): void {
    if (this._token) {
      this._notesApiService.getNotes(this._token).subscribe({
        next: (data) => {
          this.totalNotes = data.totalNotes;
          this.notes = data.notes;
        },
        error: (err) => {
          this._snackBarService.showMessage('¡No se encontraron notas!', 'Cerrar', 3000);
        },
      });
    }
  }
  openDialog() {
    if (this._token) {
      //Se guarda una referencia al dialog para poder suscribirse cuando se cierre
      //Se ocupa la instancia de MatDialog para abrir el dialog con el componente especificado
      const diaglogRef = this._dialog.open(NoteDialogComponent, {
        data: {
          mode: 'create',
          title: 'Crear nota',
        },
      });
      // Nos suscribimos para obtener los datos que nos manda al cerrar el Dialog
      diaglogRef.afterClosed().subscribe((result: { note: IApiNote; totalNotes: number }) => {
        if (!result) return;
        if (!result.note) return;

        if (this.notes.length >= this.limit) {
          this.notes.pop();
        }
        this.notes.unshift(result.note);

        if (result.totalNotes) this.totalNotes = result.totalNotes;
      });
    }
  }

  handleNoteDeleted(data: { note_id: number; totalNotes: number | undefined }) {
    const { note_id, totalNotes } = data;
    if (!note_id) return;
    const index = this.notes.findIndex((note) => note.note_id === note_id);
    this.notes.splice(index, 1);
    if (totalNotes) this.totalNotes = totalNotes;

    // Si el total de notas es mayor al limite se deben cargar denuevo las notas ya que quedaria un espacio en blanco
    if (this.totalNotes >= this.limit) {
      this._notesApiService.getNotes(this._token!, this.limit).subscribe({
        next: (data) => {
          const { notes } = data;
          this.notes = notes;
        },
        error: (err) => {
          this._snackBarService.showMessage('¡No se encontraron notas!', 'Cerrar', 3000);
        },
      });
    }
  }

  loadNotes(e: PageEvent): void {
    const pageIndex = e.pageIndex;
    this.limit = e.pageSize;

    this._notesApiService.getNotes(this._token!, this.limit, pageIndex + 1).subscribe({
      next: (data) => {
        const { notes } = data;
        this.notes = notes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
