import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/user`; // URL configurada no environment

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/addUser`, user)
      .pipe(catchError(this.handleError));
  }

  editUser(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${user.id}`, user)
      .pipe(catchError(this.handleError));
  }

  updatePermissions(user: Users): Observable<Users> {
    return this.http.patch<Users>(`${this.apiUrl}/${user.id}/permissions`, { role: user.role })
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'Erro desconhecido. Tente novamente.';
    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status && error.error?.message) {
      // Erro do backend com mensagem de resposta
      errorMessage = `Erro ${error.status}: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
