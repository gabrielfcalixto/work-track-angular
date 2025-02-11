import { Injectable } from '@angular/core';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Users[] = [
    { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin', active: true },
    { id: 2, name: 'Usuário Comum', email: 'user@example.com', role: 'user', active: true }
  ];

  getUsers(): Users[] {
    return [...this.users];
  }

  addUser(user: Users) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  editUser(updatedUser: Users) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  updatePermissions(user: Users) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index].role = user.role;
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
