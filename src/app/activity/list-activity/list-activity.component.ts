import { ActivityService } from './../activity.service';
import { Component, Input } from '@angular/core';
import { Activity } from '../activity.model';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrl: './list-activity.component.scss'
})
export class ListActivityComponent {
  @Input() projetoId!: number;
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    if (this.projetoId) {
      this.activities = this.activityService.getActivityByProject(this.projetoId);
    } else {
      console.error('Erro: projetoId não está definido!');
    }
  }


  deleteActivity(id: number) {
    this.activityService.deleteActivity(id);
    this.activities = this.activityService.getActivityByProject(this.projetoId);
  }
  editActivity(activity: Activity) {
    console.log('Editar atividade:', activity);
    // Aqui você pode adicionar lógica para abrir um modal ou navegar para uma página de edição.
  }
}
