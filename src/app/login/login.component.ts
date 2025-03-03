import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isDarkMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.token); // Armazena o token
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard
      },
      (error) => {
        console.error('Erro ao logar', error);
        if (error.status === 0) {
          // Erro de rede (não conseguiu se conectar ao servidor)
          this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else if (error.status === 401) {
          // Não autorizado
          this.errorMessage = 'Credenciais inválidas. Verifique seu nome de usuário e senha.';
        } else if (error.status === 400) {
          // Erro de validação de entrada
          this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
        } else {
          // Outros erros
          this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        }
      }
    );
  }

}
