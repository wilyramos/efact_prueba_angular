// File: efact/src/app/core/guards/auth-guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token_efact');

  if (!token) {
    // Redirecto to login
    router.navigate(['/login']);
    return false;
  }

  return true;
};
