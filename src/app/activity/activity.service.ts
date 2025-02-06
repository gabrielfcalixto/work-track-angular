import { Injectable } from '@angular/core';
import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [
    { id: 1, projectId: 1, name: 'Analisar requisitos', description: 'Definir escopo do projeto', hours: 4 },
    { id: 2, projectId: 1, name: 'Desenvolver frontend', description: 'Criar interface do usuário', hours: 8 },
    { id: 3, projectId: 1, name: 'Configurar banco', description: 'Criar estrutura do banco de dados', hours: 5 },
    { id: 4, projectId: 1, name: 'Desenvolver frontend', description: 'Criar interface do usuário', hours: 8 },
    { id: 5, projectId: 1, name: 'Configurar banco', description: 'Criar estrutura do banco de dados', hours: 5 },
  ];

  getActivityByProject(projectId: number): Activity[] {
    return this.activities.filter(activity => activity.projectId === projectId);
  }

  addActivity(activity: Activity) {
    activity.id = this.activities.length + 1;
    this.activities.push(activity);
  }

  editActivity(updateActivity: Activity) {
    const index = this.activities.findIndex(a => a.id === updateActivity.id);
    if (index !== -1) {
      this.activities[index] = updateActivity;
    }
  }

  deleteActivity(id: number) {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }
}
