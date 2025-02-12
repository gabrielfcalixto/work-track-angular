import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient){}
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);

  }

  editUser(user: Users) {
    return this.http.put<Users>(`${this.apiUrl}/${user.id}`, user);

  }

  updatePermissions(user: Users) {
    return this.http.patch<Users>(`${this.apiUrl}/${user.id}/permissions`, { role: user.role });

  }

  deleteUser(userId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
