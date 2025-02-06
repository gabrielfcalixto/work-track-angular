import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  projectId: number = 1; // Recebe o projectId para passar para o ListActivityComponent
}
