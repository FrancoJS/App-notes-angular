//Es lo que enviamos al backend para iniciar sesion al usuario
export interface IApiLoginRequest {
  email: string;
  password: string;
}

//Es lo que recibimos del backend al iniciar sesion
export interface IApiUserResponse {
  ok: boolean;
  message: string;
  user: IApiUser;
  token: string;
}

//Es el formato que tiene el usuario
interface IApiUser {
  id: number;
  username: string;
  email: string;
}

// Es lo que enviamos al backend para registrar al usuario
export interface IApiRegisterRequest {
  username: string;
  email: string;
  password: string;
}

// // Son los modelos de datos que ocupa todo los relacionado con peticiones Http de las notas
