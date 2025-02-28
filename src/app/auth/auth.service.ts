import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token'); // Remove o token
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
