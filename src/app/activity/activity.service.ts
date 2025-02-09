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
    { id: 2, projectId: 1, name: 'Desenvolver frontend', description: 'Criar interface do usuário', hours: 8 },
    { id: 3, projectId: 1, name: 'Configurar banco', description: 'Criar estrutura do banco de dados', hours: 5 }
  ];

  constructor() { }

  getActivityByProject(projectId: number): Activity[] {
    return this.activities.filter(activity => activity.projectId === projectId);
  }

  addActivity(activity: Activity) {
    activity.id = this.generateUniqueId();
    this.activities.push(activity);
  }

  editActivity(updatedActivity: Activity) {
    const index = this.activities.findIndex(a => a.id === updatedActivity.id);
    if (index !== -1) {
      this.activities[index] = { ...this.activities[index], ...updatedActivity };
    }
  }

  deleteActivity(id: number) {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }

  launchHours(activityId: number, hours: number) {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
      activity.hours += hours;
    }
  }

  private generateUniqueId(): number {
    return this.activities.length > 0 ? Math.max(...this.activities.map(a => a.id)) + 1 : 1;
  }
}
