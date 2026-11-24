import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRequest, Users } from './users.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly url = `${environment.apiUrl}/user`;

  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get<Users[]>(this.url);
  }

  addUser(user: UserRequest) {
    return this.http.post<void>(`${this.url}/add`, user);
  }

  editUser(id: number, user: UserRequest) {
    return this.http.put<Users>(`${this.url}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  changePassword(id: number, oldPassword: string, newPassword: string) {
    return this.http.put<{ message: string }>(`${this.url}/${id}/change-password`, { oldPassword, newPassword });
  }
}
