import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiNoteRequest, IApiGetNotesResponse, IApiNoteResponse } from '../models/notes-api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private readonly _notesUrl = environment.notesUrl;
  private _httpClient = inject(HttpClient);

  getNotes(token: string, limit: number = 9, page: number = 1): Observable<IApiGetNotesResponse> {
    return this._httpClient.get<IApiGetNotesResponse>(this._notesUrl + `/all?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createNote(note: IApiNoteRequest, token: string): Observable<IApiNoteResponse> {
    return this._httpClient.post<IApiNoteResponse>(this._notesUrl + '/create', note, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateNote(note: IApiNoteRequest, note_id: number, token: string): Observable<IApiNoteResponse> {
    return this._httpClient.put<IApiNoteResponse>(this._notesUrl + `/update/${note_id}`, note, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteNote(note_id: number, token: string): Observable<IApiNoteResponse> {
    return this._httpClient.delete<IApiNoteResponse>(this._notesUrl + `/delete/${note_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
