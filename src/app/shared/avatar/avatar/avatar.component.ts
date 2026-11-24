import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent {
  @Input() userName = '';

  get initials(): string {
    return this.userName.trim().split(/\s+/).slice(0, 2)
      .map(word => word.charAt(0).toUpperCase()).join('') || 'U';
  }
}
