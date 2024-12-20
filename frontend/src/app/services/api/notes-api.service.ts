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

  createNote(note: IApiNoteRequest) {
    return this._httpClient.post<IApiNoteResponse>(this._notesUrl + '/create', note, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
