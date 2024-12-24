import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = new JwtHelperService();
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token || jwtHelper.isTokenExpired(token)) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

// authGuard es una funcion que nos permite proteger las rutas de acceso de usuarios no autenticados

// Un guard se va a ejecutar antes de que se renderize el componente que corresponda a la ruta, este devuelve true si el usuario esta autenticado y false si no lo esta

// Los guard tienen que devolver si o si un true o false

// jwtHelperService es una libreria que nos ayuda a verificar si un token es valido o no
