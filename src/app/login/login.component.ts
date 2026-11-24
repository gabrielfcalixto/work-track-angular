import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../services/theme.service';
import { apiError } from '../shared/api-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  isDarkMode = document.body.classList.contains('dark-mode');
  loading = false;
  showForgotPasswordDialog = false;
  resetPasswordStep: 'request' | 'reset' = 'request';
  email = '';
  code = '';
  newPassword = '';

  constructor(
    private readonly router: Router,
    private readonly theme: ThemeService,
    private readonly messages: MessageService,
    private readonly auth: AuthService
  ) {}

  toggleTheme(): void {
    this.theme.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit(): void {
    if (this.loading || !this.username.trim() || !this.password) return;

    this.loading = true;
    this.auth.login(this.username.trim(), this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: ({ token }) => {
          this.auth.storeSession(token, this.rememberMe);
          void this.router.navigate(['/dashboard']);
        },
        error: error => this.showError(error, 'Não foi possível entrar.')
      });
  }

  requestResetCode(): void {
    if (this.loading || !this.email.trim()) return;

    this.loading = true;
    this.auth.generatePasswordResetCode(this.email.trim())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.resetPasswordStep = 'reset';
          this.messages.add({ severity: 'info', summary: 'Recuperação de senha',
            detail: 'Se o e-mail estiver cadastrado, você receberá um código.' });
        },
        error: error => this.showError(error, 'Não foi possível solicitar o código.')
      });
  }

  resetPassword(): void {
    if (this.loading || !this.code.trim() || this.newPassword.length < 8) return;

    this.loading = true;
    this.auth.resetPassword(this.email.trim(), this.code.trim(), this.newPassword)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.showForgotPasswordDialog = false;
          this.messages.add({ severity: 'success', summary: 'Senha redefinida' });
        },
        error: error => this.showError(error, 'Não foi possível redefinir a senha.')
      });
  }

  clearRecovery(): void {
    this.resetPasswordStep = 'request';
    this.email = '';
    this.code = '';
    this.newPassword = '';
  }

  private showError(error: unknown, fallback: string): void {
    this.messages.add({ severity: 'error', summary: 'Erro', detail: apiError(error, fallback) });
  }
}
