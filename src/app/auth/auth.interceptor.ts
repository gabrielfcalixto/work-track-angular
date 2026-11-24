import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const root = new URL(environment.apiUrl, window.location.origin);
    const url = new URL(request.url, window.location.origin);
    const path = root.pathname.replace(/\/$/, '');
    const api = url.origin === root.origin && url.pathname.startsWith(`${path}/`);
    if (!api || url.pathname.startsWith(`${path}/auth/`)) return next.handle(request);

    const auth = this.injector.get(AuthService);
    const token = auth.getToken();
    const authenticated = token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;
    return next.handle(authenticated).pipe(catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token && token === auth.getToken()) {
        auth.logout();
      }
      return throwError(() => error);
    }));
  }
}
