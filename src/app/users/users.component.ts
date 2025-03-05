import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from './users.service';
import { Users, Role } from './users.model'; // Importando o tipo 'Role' também
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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
  newUser: Users = { name: '', login: '', email: '', role: { name: '', value: '' } };  // Definição inicial para o tipo Users
  roles: Role[] = [
    { name: 'User', value: 'USER' },
    { name: 'Manager', value: 'MANAGER' },
    { name: 'Admin', value: 'ADMIN' }
  ];

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loading: boolean = false;

  loadUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe(
      users => {
        console.log(users);  // Verifique se os usuários estão sendo retornados
        this.users = users;
        this.loading = false;
      },
      error => {
        console.error('Erro ao carregar os usuários:', error);
        this.loading = false;
      }
    );
  }

  openAddDialog() {
    this.newUser = { name: '', login: '', email: '', role: { name: '', value: '' } };  // Resetando os campos
    this.displayAddDialog = true;
  }

  addUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.login || !this.newUser.role) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios!' });
      return;
    }

    // Garantir que o role seja uma string
    const userToSend = {
      ...this.newUser,
      role: typeof this.newUser.role === 'object' ? this.newUser.role.value : this.newUser.role // Convertendo para string se for um objeto
    };

    console.log('JSON enviado:', userToSend); // Log para verificar antes de enviar

    this.usersService.addUser(userToSend).subscribe(() => {
      this.displayAddDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário adicionado!' });
      this.loadUsers();
    });
  }

  openEditDialog(user: Users) {
    this.selectedUser = { ...user };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (!this.selectedUser?.name || !this.selectedUser?.email || !this.selectedUser?.login || !this.selectedUser?.role) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios!' });
      return;
    }

    // Garantir que o role seja uma string
    const userToSend = {
      ...this.selectedUser,
      role: typeof this.selectedUser.role === 'object' ? this.selectedUser.role.value : this.selectedUser.role // Convertendo para string se for um objeto
    };

    console.log('JSON enviado na edição:', userToSend); // Log para depuração

    this.usersService.editUser(userToSend).subscribe(() => {
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
      this.loadUsers();
    });
  }

  openPermissionDialog(user: Users) {
    this.selectedUser = { ...user };
    this.displayPermissionDialog = true;
  }

  savePermissions() {
    if (this.selectedUser) {
      this.usersService.updatePermissions(this.selectedUser).subscribe(() => {
        this.displayPermissionDialog = false;
        this.messageService.add({ severity: 'info', summary: 'Permissões atualizadas', detail: 'Permissões do usuário foram alteradas!' });
      });
    }
  }

  confirmDelete(user: Users) {
    this.selectedUser = { ...user };
    this.displayDeleteDialog = true;
  }

  deleteUser(user: Users) {
    if (!user || user.id === undefined) return; // Garante que o ID está presente
    this.usersService.deleteUser(user.id).subscribe(() => {
      this.displayDeleteDialog = false;
      this.messageService.add({ severity: 'warn', summary: 'Usuário removido', detail: 'Usuário foi excluído!' });
      this.loadUsers();
    });
  }

  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Usuários', 10, 10);

    let y = 20; // Posição inicial

    this.users.forEach((user, index) => {
      doc.setFontSize(12);
      doc.text(`Nome: ${user.name}`, 10, y);
      doc.text(`Login: ${user.login}`, 10, y + 6);
      doc.text(`Email: ${user.email}`, 10, y + 12);
      doc.text(`Função: ${user.role}`, 10, y + 18);

      y += 30; // Ajusta o espaçamento entre os usuários
    });

    doc.save('relatorio_usuarios.pdf');
  }

  gerarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.users.map(user => ({
        Nome: user.name,
        Login: user.login,
        Email: user.email,
        Função: user.role
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
    XLSX.writeFile(wb, 'relatorio_usuarios.xlsx');
  }

}
