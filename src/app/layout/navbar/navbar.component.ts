import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

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

  setLogo(){
    this.logoPath = this.isDarkMode ? 'assets/logo-hard-branca.png' : 'assets/logo-hard-preta.png'
  }

  @Output() toggleSidebar = new EventEmitter<void>(); // <-- Ajuste aqui

  emitToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
