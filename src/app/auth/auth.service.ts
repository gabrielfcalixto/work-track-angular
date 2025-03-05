import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: { id: number | null; name: string; email: string } = { id: null, name: '', email: '' };

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Obtém os dados do usuário logado a partir do token armazenado.
   */
  getLoggedUser(): any {
    const token = localStorage.getItem('token');
    console.log('Token armazenado:', token); // 👀 Verificar se há um token

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
      console.log('Payload decodificado:', payload); // 👀 Verificar se o payload tem `id`

      if (!payload || !payload.id) return null;

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        username: payload.username,
        joinDate: payload.joinDate
      };
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }


  /**
   * Remove o token e redireciona para a tela de login.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Verifica se o token armazenado está expirado.
   */
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate < new Date();
    } catch (error) {
      console.error('Erro ao verificar expiração do token:', error);
      return true;
    }
  }

}
