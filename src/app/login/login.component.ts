import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { HttpClient } from '@angular/common/http';

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
    private loginService: LoginService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }


onSubmit() {
  const loginData = { login: this.username, password: this.password }; // Certifique-se de usar os nomes corretos

  this.http.post('http://localhost:8080/api/login', loginData, { observe: 'response' }).subscribe(
    (response: any) => {
      console.log('Login bem-sucedido!', response);
      localStorage.setItem('token', response.body.token); // Armazena o token
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      console.error('Erro ao logar', error);
      alert(error.error || 'Falha no login');
    }
  );
}
}
