import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: { id: number | null; name: string; email: string } = { id: null, name: '', email: '' };
  private apiUrl = 'http://localhost:8080/auth'; // URL do seu backend


  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Obtém os dados do usuário logado a partir do token armazenado.
   */
  getLoggedUser(): any {
    const token = localStorage.getItem('token');
    console.log('Token armazenado:', token); // Verifique se há um token

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
      console.log('Payload decodificado:', payload); // Verifique se o payload tem `id` e `role`

      if (!payload || !payload.id || !payload.role) return null;

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,  // Pegando o campo "role"
        username: payload.sub, // Certifique-se de que "sub" seja o nome de usuário
        joinDate: payload.joinDate
      };
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }


  getUserRole(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;  // Supondo que o backend inclua "role" no payload do token
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

    // Método para solicitar o código de reset de senha
    generatePasswordResetCode(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/generate-reset-code`, { email });
    }


    // Método para redefinir a senha
    resetPassword(email: string, code: string, newPassword: string): Observable<any> {
      const body = {
        email: email,
        code: code,
        newPassword: newPassword
      };

      return this.http.post(`${this.apiUrl}/reset-password`, body);
    }


}


