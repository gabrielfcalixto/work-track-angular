import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service'; // Serviço de autenticação

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  defaultAvatar = 'https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  constructor(
    private authService: AuthService, // Adicionando o serviço de autenticação
    private profileService: ProfileService,
    private messageService: MessageService
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
}
