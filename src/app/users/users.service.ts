import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient){}

  // Função para gerar os headers com token
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ou onde você armazena o token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsers(): Observable<Users[]> {
    const headers = this.createHeaders();
    return this.http.get<Users[]>(`${this.apiUrl}`, { headers })
      .pipe(catchError(this.handleError)); // Usa o catchError para tratar o erro
  }

  addUser(user: Users): Observable<Users> {
    const headers = this.createHeaders();
    return this.http.post<Users>(`${this.apiUrl}/addUser`, user, { headers })
      .pipe(catchError(this.handleError)); // Usa o catchError para tratar o erro
  }

  editUser(user: Users): Observable<Users> {
    const headers = this.createHeaders();
    return this.http.put<Users>(`${this.apiUrl}/${user.id}`, user, { headers })
      .pipe(catchError(this.handleError)); // Usa o catchError para tratar o erro
  }

  updatePermissions(user: Users): Observable<Users> {
    const headers = this.createHeaders();
    return this.http.patch<Users>(`${this.apiUrl}/${user.id}/permissions`, { role: user.role }, { headers })
      .pipe(catchError(this.handleError)); // Usa o catchError para tratar o erro
  }

  deleteUser(userId: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, { headers })
      .pipe(catchError(this.handleError)); // Usa o catchError para tratar o erro
  }

  private handleError(error: any) {
    // Trate o erro conforme necessário
    console.error('Erro na requisição:', error);
    return throwError('Algo deu errado. Tente novamente.');
  }
}
