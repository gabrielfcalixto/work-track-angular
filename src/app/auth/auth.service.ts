import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
    const expirationDate = new Date(payload.exp * 1000); // Converte o tempo de expiração para milissegundos
    return expirationDate < new Date(); // Verifica se o token expirou
  }

}
