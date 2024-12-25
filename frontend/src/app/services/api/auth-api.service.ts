import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiLoginRequest, IApiUserResponse, IApiRegisterRequest } from '../models/user-api.iterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  // Obtenemos la url de autenticacion desde el archivo de environment
  private readonly _authUrl = environment.authUrl;
  private _httpClient = inject(HttpClient);

  // Peticion Http Para loguear al usuario
  loginUser(user: IApiLoginRequest): Observable<IApiUserResponse> {
    return this._httpClient.post<IApiUserResponse>(this._authUrl + '/login', user);
  }

  // Peticion para registrar a un usuario
  registerUser(user: IApiRegisterRequest): Observable<IApiUserResponse> {
    return this._httpClient.post<IApiUserResponse>(this._authUrl + '/register', user);
  }
}
