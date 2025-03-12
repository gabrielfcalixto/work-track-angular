import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ThemeService } from './../../services/theme.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('sidebar') sidenav!: SidebarComponent; // Acesse o SideNavComponent


  isDarkMode = false;
  logoPath = 'assets/logo-hard-preta.png';
  user: any;


  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService) {
    this.isDarkMode = document.body.classList.contains('dark-mode');
    this.setLogo();
    this.user = this.authService.getLoggedUser();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
    this.setLogo();
  }

  setLogo(): void {
    this.logoPath = this.isDarkMode ? 'assets/imagens/logo-branca.png' : 'assets/imagens/logo-preta.png';
  }

  toggleSidebar(): void {
    this.sidenav.toggleSidebar();
  }

  navigateToProfile():void
  {
    this.router.navigate(['/profile']); // Navega para a página de Perfil
  }
  logout(): void {

    this.router.navigate(['/login']);
  }

}
