import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/user'; // Altere para a URL correta

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, userData);
  }
}
