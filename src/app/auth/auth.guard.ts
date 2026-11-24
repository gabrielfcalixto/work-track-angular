import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly auth: AuthService) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.getLoggedUser()) return true;

    this.auth.clearSession();
    return this.router.createUrlTree(['/login']);
  }
}
