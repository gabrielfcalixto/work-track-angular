import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}  // Injete o Router no construtor

  onSubmit() {
    // Aqui você pode adicionar a lógica para verificar o login
    if (this.username === 'admin' && this.password === 'password') {  // Exemplo de validação simples
      this.router.navigate(['/dashboard']);  // Redireciona para o dashboard
    } else {
      alert('Invalid credentials');  // Exibe um alerta simples caso o login falhe
    }
  }
}
