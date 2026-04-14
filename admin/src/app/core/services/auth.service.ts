import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AuthError,
  AuthUser,
  LoginResponse,
  UserRole,
} from './auth.model';

const ACCESS_TOKEN_KEY = 'auth.access_token';
const REFRESH_TOKEN_KEY = 'auth.refresh_token';
const STORAGE_MODE_KEY = 'auth.storage_mode';

export type LogoutReason = 'manual' | 'expired' | 'forbidden';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _currentUser = signal<AuthUser | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly isAdmin = computed(() => this._currentUser()?.role === 'ADMIN');

  private readonly baseUrl = environment.apiUrl;

  /**
   * Performs login against the backend. On success: stores tokens (localStorage
   * if rememberMe, else sessionStorage), fetches /auth/me, validates ADMIN role.
   */
  login(email: string, password: string, rememberMe: boolean): Observable<AuthUser> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => this.persistTokens(res.access_token, res.refresh_token, rememberMe)),
        switchMap(() => this.loadCurrentUser()),
        tap((user) => {
          if (user.role !== 'ADMIN') {
            this.clearStorage();
            this._currentUser.set(null);
            throw new AuthError('forbidden_role');
          }
        }),
        catchError((err: unknown) => throwError(() => this.mapError(err))),
      );
  }

  /**
   * Fetches the current user from /auth/me using whatever token is already stored.
   * Used both by login() and by the app initializer after a reload.
   */
  loadCurrentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.baseUrl}/auth/me`).pipe(
      tap((user) => this._currentUser.set(user)),
    );
  }

  /**
   * Exchanges the stored refresh_token for a new pair. Returns the new access_token
   * so the error interceptor can replay the original request.
   */
  refresh(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new AuthError('unknown'));
    }
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/refresh`, { refresh_token: refreshToken })
      .pipe(
        tap((res) => {
          const mode = this.readStorageMode();
          this.persistTokens(res.access_token, res.refresh_token, mode === 'local');
        }),
        map((res) => res.access_token),
      );
  }

  logout(reason: LogoutReason = 'manual'): void {
    this.clearStorage();
    this._currentUser.set(null);
    const extras = reason === 'manual' ? undefined : { queryParams: { reason } };
    this.router.navigate(['/login'], extras);
  }

  hasStoredToken(): boolean {
    return this.getAccessToken() !== null;
  }

  getAccessToken(): string | null {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  }

  getRefreshToken(): string | null {
    return (
      localStorage.getItem(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
  }

  /** Ensures the in-memory user signal matches the role persisted by the backend. */
  setCurrentUser(user: AuthUser | null): void {
    this._currentUser.set(user);
  }

  private persistTokens(accessToken: string, refreshToken: string, rememberMe: boolean): void {
    this.clearStorage();
    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem(ACCESS_TOKEN_KEY, accessToken);
    store.setItem(REFRESH_TOKEN_KEY, refreshToken);
    store.setItem(STORAGE_MODE_KEY, rememberMe ? 'local' : 'session');
  }

  private readStorageMode(): 'local' | 'session' {
    return (
      (localStorage.getItem(STORAGE_MODE_KEY) as 'local' | null) ??
      (sessionStorage.getItem(STORAGE_MODE_KEY) as 'session' | null) ??
      'local'
    );
  }

  private clearStorage(): void {
    [localStorage, sessionStorage].forEach((store) => {
      store.removeItem(ACCESS_TOKEN_KEY);
      store.removeItem(REFRESH_TOKEN_KEY);
      store.removeItem(STORAGE_MODE_KEY);
    });
  }

  private mapError(err: unknown): AuthError {
    if (err instanceof AuthError) return err;
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return new AuthError('server_unreachable');
      if (err.status === 401) return new AuthError('invalid_credentials');
    }
    return new AuthError('unknown');
  }
}
