import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth/login'; // Endpoint de login do backend
  private resetPasswordUrl = 'http://localhost:8080/user/reset-password'; // reset de senha


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { login: username, password });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(this.resetPasswordUrl, null, {
      params: { email }
    });
  }
}
