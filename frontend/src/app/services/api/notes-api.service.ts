import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiNoteRequest, IApiGetNotesResponse, IApiNoteResponse } from '../models/notes-api.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private readonly _notesUrl = 'http://localhost:3000/api/notes';
  private _httpClient = inject(HttpClient);
  private readonly _token = localStorage.getItem('token');
  getNotes(): Observable<IApiGetNotesResponse> {
    return this._httpClient.get<IApiGetNotesResponse>(this._notesUrl + '/all', {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
  createNote(note: IApiNoteRequest): Observable<IApiNoteResponse> {
    return this._httpClient.post<IApiNoteResponse>(this._notesUrl + '/create', note, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
  updateNote(note: IApiNoteRequest, note_id: number): Observable<IApiNoteResponse> {
    return this._httpClient.put<IApiNoteResponse>(this._notesUrl + `/update/${note_id}`, note, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }

  deleteNote(note_id: number): Observable<IApiNoteResponse> {
    return this._httpClient.delete<IApiNoteResponse>(this._notesUrl + `/delete/${note_id}`, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
