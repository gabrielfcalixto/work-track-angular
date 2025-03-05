import { LoadingService } from './../loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service'; // Serviço de autenticação
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  defaultAvatar = 'https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';



  // Variáveis para o diálogo de redefinição de senha
  displayResetPasswordDialog: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';

  constructor(
    private userService: UsersService, // Adicionando o serviço de autenticação
    private authService: AuthService, // Injetando o serviço de autenticação
    private profileService: ProfileService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const loggedUser = this.authService.getLoggedUser(); // Obtém o usuário autenticado
    console.log('Usuário logado:', loggedUser); // 👀 Verificar no console

    if (!loggedUser || !loggedUser.id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Usuário não autenticado'
      });
      return;
    }

    this.profileService.getUserById(loggedUser.id).subscribe({
      next: (data) => {
        console.log('Dados do perfil carregados:', data); // 👀 Verificar no console
        this.user = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar perfil'
        });
        console.error('Erro ao carregar perfil:', error);
      }
    });
  }


  uploadProfilePicture(event: any): void {
    console.log('Evento de upload:', event); // 👀 Verificar se o evento está correto

    const file = event.files ? event.files[0] : null;
    console.log('Arquivo selecionado:', file); // 👀 Verificar se o arquivo está presente

    if (!file) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Nenhum arquivo selecionado'
      });
      return;
    }

    this.profileService.uploadProfilePicture(file).subscribe({
      next: (response) => {
        console.log('Resposta do upload:', response); // 👀 Verificar a resposta da API
        if (this.user) {
          this.user.profilePicture = response.url;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Foto de perfil atualizada'
        });
      },
      error: (error) => {
        console.error('Erro ao fazer upload:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar foto de perfil'
        });
      }
    });
  }

  onUpload(event: any): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Upload Concluído',
      detail: 'Arquivo enviado com sucesso'
    });
  }

  // Métodos para o diálogo de redefinição de senha
  showResetPasswordDialog(): void {
    this.displayResetPasswordDialog = true;
  }

  hideResetPasswordDialog(): void {
    this.displayResetPasswordDialog = false;
    this.oldPassword = '';
    this.newPassword = '';
  }

  resetPassword() {
    if (!this.oldPassword || !this.newPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os campos' });
      return;
    }

    this.loadingService.show(); // ⏳ Mostra o loading

    this.userService.changePassword(this.user.id, this.oldPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha alterada!' });
          this.hideResetPasswordDialog();
          this.loadingService.hide(); // ✅ Garante que o loading some
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error?.error || 'Erro ao alterar a senha' });
          this.loadingService.hide(); // ✅ Esconde o loading em caso de erro
        }
      });
  }
}

