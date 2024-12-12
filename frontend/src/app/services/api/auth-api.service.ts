import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiLoginRequest, IApiLoginResponse } from './models/user-api.iterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _loginUrl = 'http://localhost:3000/api/users/auth/login';
  private _httpClient = inject(HttpClient);

  loginUser(user: IApiLoginRequest): Observable<IApiLoginResponse> {
    return this._httpClient.post<IApiLoginResponse>(this._loginUrl, user);
  }
}
