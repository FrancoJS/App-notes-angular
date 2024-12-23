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
