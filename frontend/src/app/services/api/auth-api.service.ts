import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiLoginRequest, IApiUserResponse, IApiRegisterRequest } from '../models/user-api.iterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _loginUrl = 'http://localhost:3000/api/users/auth/login';
  private readonly _registerUrl = 'http://localhost:3000/api/users/auth/register';
  private _httpClient = inject(HttpClient);

  loginUser(user: IApiLoginRequest): Observable<IApiUserResponse> {
    return this._httpClient.post<IApiUserResponse>(this._loginUrl, user);
  }

  registerUser(user: IApiRegisterRequest): Observable<IApiUserResponse> {
    return this._httpClient.post<IApiUserResponse>(this._registerUrl, user);
  }
}
