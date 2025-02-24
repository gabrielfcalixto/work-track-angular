import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { LoginComponent } from '../login/login.component';
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
  newUser: Users = { name: '', login:'', password:'', email: '', role: '' };

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(
      users => {
        console.log(users);  // Verifique se os usuários estão sendo retornados
        this.users = users;
      },
      error => {
        console.error('Erro ao carregar os usuários:', error);
      }
    );
  }

  openAddDialog() {
    this.newUser = { name: '', login:'', password:'', email: '', role: ''};
    this.displayAddDialog = true;
  }
  addUser() {
    this.usersService.addUser(this.newUser).subscribe(() => {
      this.displayAddDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário adicionado!' });
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


  openEditDialog(user: Users) {
    this.selectedUser = { ...user };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (this.selectedUser) {
      this.usersService.editUser(this.selectedUser).subscribe(() =>{
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
      this.loadUsers();
    });
    }
  }

  openPermissionDialog(user: Users) {
    this.selectedUser = { ...user };
    this.displayPermissionDialog = true;
  }

  savePermissions() {
    if (this.selectedUser) {
      this.usersService.updatePermissions(this.selectedUser).subscribe(() =>{
      this.displayPermissionDialog = false;
      this.messageService.add({ severity: 'info', summary: 'Permissões atualizadas', detail: 'Permissões do usuário foram alteradas!' });
    });
    }
  }

  confirmDelete(user: Users) {
    this.selectedUser ={...user};
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

}
