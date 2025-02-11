import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from './users.service';
import { Users } from './users.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  selectedUser: Users | null = null;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  searchTerm: string = '';
  newUser: Users = { id: 0, name: '', email: '', role: 'user', active: true };
  roles = [{name: 'admin'}, {name: 'User'}];


  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.usersService.getUsers();
  }

  openAddDialog() {
    this.newUser = { id: 0, name: '', email: '', role: 'user', active: true };
    this.displayAddDialog = true;
  }

  addUser() {
    this.usersService.addUser(this.newUser);
    this.displayAddDialog = false;
    this.loadUsers();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário adicionado!' });
  }

  openEditDialog(users: Users) {
    this.selectedUser = { ...users };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (this.selectedUser) {
      this.usersService.editUser(this.selectedUser);
      this.displayEditDialog = false;
      this.loadUsers();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
    }
  }

  openPermissionDialog(users: Users) {
    this.selectedUser = { ...users };
    this.displayPermissionDialog = true;
  }

  savePermissions() {
    if (this.selectedUser) {
      this.usersService.updatePermissions(this.selectedUser);
      this.displayPermissionDialog = false;
      this.messageService.add({ severity: 'info', summary: 'Permissões atualizadas', detail: 'Permissões do usuário foram alteradas!' });
    }
  }

  confirmDelete(user: Users) {
    this.selectedUser ={...user};
    this.displayDeleteDialog = true;
  }

  deleteUser(user: Users) {
    if(!user) return;
      this.usersService.deleteUser(user.id);
      this.loadUsers();
      this.displayDeleteDialog = false;
      this.messageService.add({ severity: 'warn', summary: 'Usuário removido', detail: 'Usuário foi excluído!' });
  }
}
