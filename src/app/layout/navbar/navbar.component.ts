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

  constructor(private themeService: ThemeService, private router: Router) {
    this.isDarkMode = document.body.classList.contains('dark-mode');
    this.setLogo();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
    this.setLogo();
  }

  setLogo(): void {
    this.logoPath = this.isDarkMode ? 'assets/logo-hard-branca.png' : 'assets/logo-hard-preta.png';
  }

  toggleSidebar(): void {
    this.sidenav.toggleSidebar();
  }

  navigateToProfile():void
  {
    this.router.navigate(['/profile']); // Navega para a página de Perfil
  }
  logout(): void {
    // Aqui você pode adicionar a lógica de logout, como limpar tokens ou sessões
    // Exemplo: chamar um serviço de autenticação
    // this.authService.logout();

    // Redirecionar para a página de login após logout
    this.router.navigate(['/login']);
  }

}
