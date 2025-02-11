import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';
import { Activity } from './activity.model';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  newActivity: Activity = { id: 0, name: '', description: '', hours: 0, projectId: 0 };
  selectedActivity: Activity | null = null;
  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;
  projetoId: number = 1; // Defina o ID do projeto correto

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activities = this.activityService.getActivityByProject(this.projetoId);
  }

  // Abre o diálogo para adicionar uma nova atividade
  openAddDialog() {
    this.newActivity = { id: 0, name: '', description: '', hours: 0, projectId: this.projetoId };
    this.displayAddDialog = true;
  }

  // Salva a nova atividade
  addActivity() {
    this.activityService.addActivity(this.newActivity);
    this.displayAddDialog = false;
    this.loadActivities();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade adicionada!' });
  }

  // Abre o diálogo de edição
  openEditDialog(activity: Activity) {
    this.selectedActivity = { ...activity };
    this.displayEditDialog = true;
  }

  // Salva as edições da atividade
  saveEdit() {
    if (this.selectedActivity) {
      this.activityService.editActivity(this.selectedActivity);
      this.displayEditDialog = false;
      this.loadActivities();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade atualizada!' });
    }
  }

  displayAddHoursDialog: boolean = false;
  hoursToAdd: number = 0;

  // Método para abrir o diálogo de adicionar horas
  openAddHoursDialog(activity: Activity) {
    this.selectedActivity = activity;
    this.hoursToAdd = 0;  // Reinicia a quantidade de horas
    this.displayAddHoursDialog = true;
  }

  // Método para adicionar horas à atividade
  addActivityHours() {
    if (this.selectedActivity) {
      this.selectedActivity.hours += this.hoursToAdd;
      this.activityService.editActivity(this.selectedActivity);
      this.loadActivities();
      this.displayAddHoursDialog = false;
      this.messageService.add({
        severity: 'info',
        summary: 'Horas adicionadas',
        detail: `+${this.hoursToAdd} horas na atividade!`
      });
    }
  }
  onDeleteDialogVisibilityChange(visible: boolean) {
    // Este método pode ser deixado vazio ou você pode adicionar lógica conforme necessário
    console.log('Visibilidade do diálogo de exclusão:', visible);
  }


  // Concluir tarefa
  completeActivity(activity: Activity) {
    activity.completed = true;
    this.activityService.editActivity(activity);
    this.loadActivities();
    this.messageService.add({ severity: 'success', summary: 'Tarefa concluída', detail: 'Atividade finalizada!' });
  }

  // No seu componente, adicione isso à sua lógica de confirmação de exclusão:

confirmDelete(activity: Activity) {
  this.confirmationService.confirm(
    {
      message: 'Tem certeza que deseja excluir esta atividade?',
      header: 'Excluir Atividade',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteActivity(activity);
      },
      reject: () => {
        // No caso de rejeitar a exclusão, nada acontece
      }
    } as any);

}
deleteActivity(activity: Activity) {
  this.activityService.deleteActivity(activity.id);
  this.displayDeleteDialog = false;  // Fecha o diálogo após a exclusão
  this.loadActivities();
  this.messageService.add({ severity: 'warn', summary: 'Excluído', detail: 'Atividade removida!' });
}


}
