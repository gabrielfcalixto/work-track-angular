import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const role = this.auth.getUserRole();
    const allowed: UserRole[] = route.data['roles'] ?? [];
    if (!role) return this.router.createUrlTree(['/login']);
    return allowed.includes(role) || this.router.createUrlTree(['/dashboard']);
  }
}
