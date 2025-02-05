import { Component, EventEmitter, Output, output } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.scss'
})
export class AddActivityComponent {
  @Output() activityAdded = new EventEmitter<void>();
  newActivity: Activity = { id: 0, name: '', description: '', hours: 0, projectId: 0 };

  constructor(private activityService: ActivityService) { }

  addActivity() {
    this.activityService.addActivity(this.newActivity);
    this.activityAdded.emit();
    this.newActivity = { id: 0, name: '', description: '', hours: 0, projectId: 0 };
  }
}
