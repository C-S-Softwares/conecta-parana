import { inject, provideAppInitializer } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

/**
 * Runs once at bootstrap. If a token is already stored (from a previous session),
 * we hit /auth/me to rehydrate the current user signal before the router evaluates
 * any guard. On failure the stale tokens are cleared via logout('expired').
 */
export const provideAuthInitializer = () =>
  provideAppInitializer(() => {
    const auth = inject(AuthService);
    if (!auth.hasStoredToken()) {
      return Promise.resolve();
    }
    return firstValueFrom(
      auth.loadCurrentUser().pipe(
        catchError(() => {
          auth.logout('expired');
          return of(null);
        }),
      ),
    );
  });
