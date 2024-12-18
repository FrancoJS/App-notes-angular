import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiNotesResponse } from '../models/notes-api.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private readonly _notesUrl = 'http://localhost:3000/api/notes';
  private _httpClient = inject(HttpClient);
  private readonly _token = localStorage.getItem('token');
  getNotes(): Observable<IApiNotesResponse> {
    return this._httpClient.get<IApiNotesResponse>(this._notesUrl + '/all', {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
