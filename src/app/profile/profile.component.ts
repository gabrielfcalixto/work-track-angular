import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { apiError } from '../shared/api-error';
import { UsersService } from '../users/users.service';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user?: Profile;
  error = '';
  displayResetPasswordDialog = false;
  saving = false;
  oldPassword = '';
  newPassword = '';

  constructor(
    private readonly users: UsersService,
    private readonly profiles: ProfileService,
    private readonly messages: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.error = '';
    this.profiles.getProfile().subscribe({
      next: profile => this.user = profile,
      error: error => this.error = apiError(error, 'Não foi possível carregar o perfil.')
    });
  }

  hideResetPasswordDialog(): void {
    this.displayResetPasswordDialog = false;
    this.oldPassword = '';
    this.newPassword = '';
  }

  resetPassword(): void {
    if (!this.user || this.saving || !this.oldPassword || this.newPassword.length < 8) return;
    this.saving = true;
    this.users.changePassword(this.user.id, this.oldPassword, this.newPassword)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.messages.add({ severity: 'success', summary: 'Senha alterada' });
          this.hideResetPasswordDialog();
        },
        error: error => this.messages.add({ severity: 'error', summary: 'Erro',
          detail: apiError(error, 'Não foi possível alterar a senha.') })
      });
  }
}
