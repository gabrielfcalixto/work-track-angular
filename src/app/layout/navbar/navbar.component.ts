import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>(); // Emitir o evento para abrir ou fechar o sidebar

  isDarkMode = false;
  logoPath = 'assets/logo-hard-preta.png';

  constructor(private themeService: ThemeService) {
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

  // Emitir o evento quando o botão for clicado
  emitToggleSidebar(): void {
    console.log('Botão do sidebar clicado!'); // Para depuração
    this.toggleSidebar.emit();
  }
}
