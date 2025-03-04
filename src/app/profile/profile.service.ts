import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  joinDate: string;
  profilePicture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    console.log(`Fazendo requisição para: ${this.apiUrl}/${id}`); // 👀 Verificar se a URL está correta
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  uploadProfilePicture(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload-profile-picture`, formData);
  }
}
