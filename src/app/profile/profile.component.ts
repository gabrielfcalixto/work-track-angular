// Component TypeScript
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  defaultAvatar = 'https://via.placeholder.com/150'; // Avatar padrão

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = 1; // Substituir por lógica de autenticação real
    this.profileService.getUserById(userId).subscribe({
      next: (data) => {
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
    const file = event.files[0];
    this.profileService.uploadProfilePicture(file).subscribe({
      next: (response) => {
        this.user.profilePicture = response.url;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Foto de perfil atualizada'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar foto de perfil'
        });
      }
    });
  }

  onUpload(event: any): void {
    // Handler necessário para p-fileUpload
  }
}
