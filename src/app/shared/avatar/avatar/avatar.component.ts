import { Component, Input, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userName: string = '';

  avatarLabel: string = 'U';
  avatarColor: string = '#607D8B'; // Cor padrão

  // Cores para Lara Light Teal e Lara Dark Teal
  colorsLaraLightTeal: string[] = [
    '#00796B', '#004D40', '#009688', '#80CBC4', '#B2DFDB',
    '#4DB6AC', '#26A69A', '#00897B', '#00695C', '#A7FFEB',
    '#1DE9B6', '#00BFA5', '#C8E6C9', '#81C784', '#388E3C'
  ];

  colorsLaraDarkTeal: string[] = [
    '#004D40', '#00332E', '#1B5E20', '#00695C', '#003B3A',
    '#004F3C', '#00796B', '#004D44', '#00695C', '#80CBC4',
    '#2C6B59', '#00675B', '#004D40', '#004344', '#00251A'
  ];

  currentTheme: string = '';

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.setAvatarProperties();
    this.detectTheme();
  }

  detectTheme() {
    const theme = this.document.body.classList.contains('lara-dark-teal') ? 'dark' : 'light';
    this.currentTheme = theme;
    console.log(`Current theme: ${this.currentTheme}`);
  }

  setAvatarProperties() {
    if (this.userName) {
      this.avatarLabel = this.userName.charAt(0).toUpperCase();
      const charCode = this.avatarLabel.charCodeAt(0);

      // Usando as cores baseadas no tema atual
      if (this.currentTheme === 'dark') {
        this.avatarColor = this.colorsLaraDarkTeal[charCode % this.colorsLaraDarkTeal.length];
      } else {
        this.avatarColor = this.colorsLaraLightTeal[charCode % this.colorsLaraLightTeal.length];
      }
    }
  }
}
