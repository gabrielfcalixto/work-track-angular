import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  username: string;
  joinDate: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly router: Router, private readonly http: HttpClient) {}

  login(login: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { login, password });
  }

  storeSession(token: string, persistent: boolean): void {
    this.clearSession();
    (persistent ? localStorage : sessionStorage).setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token') ?? localStorage.getItem('token');
  }

  getLoggedUser(): SessionUser | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const [header, encoded, signature, extra] = token.split('.');
      if (!header || !encoded || !signature || extra !== undefined) return null;
      const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const bytes = Uint8Array.from(atob(base64), character => character.charCodeAt(0));
      const { id, name, email, role, sub, joinDate, exp } = JSON.parse(new TextDecoder().decode(bytes));
      if (!Number.isSafeInteger(id) || id <= 0 || !Number.isFinite(exp) || exp * 1000 <= Date.now()
          || !['USER', 'MANAGER', 'ADMIN'].includes(role)) {
        return null;
      }
      return { id, name, email, role, username: sub, joinDate };
    } catch {
      return null;
    }
  }

  getUserRole(): UserRole | null {
    return this.getLoggedUser()?.role ?? null;
  }

  clearSession(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }

  logout(): void {
    this.clearSession();
    void this.router.navigate(['/login']);
  }

  generatePasswordResetCode(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/generate-reset-code`, { email });
  }

  resetPassword(email: string, code: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, { email, code, newPassword });
  }
}
