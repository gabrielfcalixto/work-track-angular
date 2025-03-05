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

  getProfilePicture(userId: number): void {
    this.userService.getProfilePicture(userId).subscribe((data) => {
      const file = new Blob([data], { type: 'image/jpeg' }); // Ou outro tipo conforme necessário
      const fileURL = URL.createObjectURL(file);
      this.user.profilePicturePath = fileURL; // Aqui você cria uma URL local para a imagem
    });
  }

  // Função que é chamada ao processar o upload personalizado
  uploadProfilePicture(event: any): void {
    this.loadingService.show(); // ✅ Garante que o loading some
    const formData = new FormData();

    // Adiciona a imagem ao FormData
    formData.append('profilePicture', event.files[0], event.files[0].name);

    // Envia o FormData para o backend através do UserService
    this.userService.uploadProfilePicture(this.user.id, formData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Foto de perfil alterada!' });
        this.user.profilePicture = response.profilePicture; // Atualiza a imagem do usuário com a resposta do backend
        this.loadingService.hide(); // ✅ Garante que o loading some
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar a foto de perfil' });
        this.loadingService.hide(); // ✅ Garante que o loading some
      }
    });
  }
}



