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
  email: string = '';
  code: string = '';
  newPassword: string = '';
  resetPasswordStep: 'request' | 'reset' = 'request'; // Etapa de recuperação de senha
  showForgotPasswordDialog: boolean = false; // Controle do diálogo



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

  // Método para solicitar o código de reset de senha
  requestResetCode(): void {
    if (!this.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, insira seu e-mail.'
      });
      return;
    }

    this.loading = true; // Mostra loading ao clicar

    this.authService.generatePasswordResetCode(this.email).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Código enviado para o seu e-mail!'
        });
        this.resetPasswordStep = 'reset'; // Avança para a etapa de redefinir senha
        this.loading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao solicitar o código. Verifique o e-mail e tente novamente.'
        });
        this.loading = false;
      }
    );
  }

  // Método para redefinir a senha
  resetPassword(): void {
    if (!this.email || !this.code || !this.newPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos.'
      });
      return;
    }

    this.loading = true; // Mostra loading ao clicar

    this.authService.resetPassword(this.email, this.code, this.newPassword).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Senha redefinida com sucesso!'
        });
        this.resetPasswordStep = 'request'; // Volta para a etapa inicial
        this.showForgotPasswordDialog = false; // Fecha o diálogo
        this.email = '';
        this.code = '';
        this.newPassword = '';
        this.loading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao redefinir a senha. Verifique os dados e tente novamente.'
        });
        this.loading = false;
      }
    );
  }
}
