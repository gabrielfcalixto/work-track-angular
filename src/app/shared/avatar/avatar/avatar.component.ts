import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() userName: string = '';

  avatarLabel: string = 'U';
  avatarColor: string = '#607D8B'; // Cor padrão

  colors: string[] = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
    '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722'
  ];

  ngOnInit() {
    this.setAvatarProperties();
  }

  setAvatarProperties() {
    if (this.userName) {
      this.avatarLabel = this.userName.charAt(0).toUpperCase();
      const charCode = this.avatarLabel.charCodeAt(0);
      this.avatarColor = this.colors[charCode % this.colors.length];
    }
  }
}
