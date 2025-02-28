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
        this.errorMessage = error.error || 'Falha no login';
      }
    );
  }
}
