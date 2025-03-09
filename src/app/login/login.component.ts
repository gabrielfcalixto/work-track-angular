import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isDarkMode: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  rememberMe: boolean = false;
  showForgotPasswordDialog: boolean = false;
  forgotPasswordEmail: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private loginService: LoginService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = ''; // Limpa mensagens de erro anteriores

    this.loginService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.loading = false;
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.token); // Armazena o token
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true'); // Armazena a preferência de "Lembrar-me"
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!'
        });
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard
      },
      (error) => {
        this.loading = false;
        console.error('Erro ao logar', error);
        let errorDetail = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        if (error.status === 0) {
          errorDetail = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else if (error.status === 401) {
          errorDetail = 'Credenciais inválidas. Verifique seu nome de usuário e senha.';
        } else if (error.status === 400) {
          errorDetail = 'Por favor, preencha todos os campos corretamente.';
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorDetail
        });
      }
    );
  }

  sendResetPasswordEmail() {
    if (!this.forgotPasswordEmail) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Digite um e-mail válido.'
      });
      return;
    }

    this.loading = true; // Mostra loading ao clicar

    this.loginService.resetPassword(this.forgotPasswordEmail).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Senha redefinida com sucesso',
          detail: 'Uma nova senha foi gerada e enviada para o seu e-mail.'
        });

        this.showForgotPasswordDialog = false;
        this.forgotPasswordEmail = '';
        this.loading = false; // Oculta loading após sucesso
      },
      error: (err) => {
        const errorMessage =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || 'Falha ao enviar nova senha.';

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage
        });

        this.loading = false; // Oculta loading após erro também
      }
    });
  }
}
