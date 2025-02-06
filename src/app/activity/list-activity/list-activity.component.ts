import { ActivityService } from './../activity.service';
import { Component, Input } from '@angular/core';
import { Activity } from '../activity.model';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrl: './list-activity.component.scss'
})
export class ListActivityComponent {
  @Input() projectId: number = 0; // ou null se preferir
  activities: Activity[] = [];
  displayModal: boolean = false;
  isEdit: boolean = false;
  activityData: Activity = {id: 0, name: '', description:'', hours:0, projectId:0};

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadActivities();
  }
  loadActivities() {
    if (this.projectId) {
      console.log("Projeto ID recebido:", this.projectId);
      this.activities = this.activityService.getActivityByProject(this.projectId);
      console.log("Atividades carregadas:", this.activities);
    } else {
      console.error('Erro: projectId não está definido!');
    }
  }


  openDialog(activity?: Activity) {
    this.isEdit = !!activity;
    this.activityData = activity ? { ...activity } : { id: 0, name: '', description: '', hours: 0, projectId: this.projectId };
    this.displayModal = true;
  }

  closeDialog() {
    this.displayModal = false;
  }

  saveActivity() {
    if (this.isEdit) {
      this.activityService.editActivity(this.activityData);
    } else {
      this.activityService.addActivity(this.activityData);
    }
    this.activities = this.activityService.getActivityByProject(this.projectId); // Atualiza a lista
    this.closeDialog();
  }

  deleteActivity(activityId: number) {
    this.activityService.deleteActivity(activityId);
    this.activities = this.activityService.getActivityByProject(this.projectId); // Atualiza a lista
  }
}
