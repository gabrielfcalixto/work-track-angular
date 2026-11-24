import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  readonly user = this.auth.getLoggedUser();
  isDarkMode = document.body.classList.contains('dark-mode');

  constructor(private readonly theme: ThemeService, private readonly auth: AuthService) {}

  toggleTheme(): void {
    this.theme.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  logout(): void {
    this.auth.logout();
  }
}
