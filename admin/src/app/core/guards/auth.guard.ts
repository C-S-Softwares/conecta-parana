import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Protects authenticated routes: user must be logged in AND have ADMIN role.
 * Non-admin users are logged out and bounced to /login with a reason flag.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (!auth.isAdmin()) {
    auth.logout('forbidden');
    return router.createUrlTree(['/login'], { queryParams: { reason: 'forbidden' } });
  }

  return true;
};

/**
 * Prevents an already-authenticated admin from seeing the login page —
 * sends them straight to /posts instead.
 */
export const loginGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated() && auth.isAdmin()) {
    return router.createUrlTree(['/posts']);
  }
  return true;
};
