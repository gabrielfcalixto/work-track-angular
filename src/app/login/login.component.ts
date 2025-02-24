import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Verifica se o tema atual é escuro
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }
}
