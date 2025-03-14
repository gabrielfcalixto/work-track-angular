import { TaskService } from './../task/task.service';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { TimeEntry } from '../time-entry/time-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { MessageService } from 'primeng/api';
import { forkJoin, map } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: 'user' | 'manager' | 'admin' = 'user';  // Exemplo: ajustar conforme o login
  user: any = null;
  totalHoursMonth: number = 0;  // Total de horas lançadas no mês
  pendingTasksCount: number = 0;  // Contagem de tarefas pendentes
  completedTasksCount: number = 0;  // Tarefas completadas (manager)
  ongoingTasksCount: number = 0;  // Tarefas em andamento (manager)
  totalProjectsManaged: number = 0; // Novo campo para armazenar a quantidade de projetos gerenciados
  totalCompletedTask: number = 0;

  timeEntries: TimeEntry[] = [];
  timeEntryForm: FormGroup;
  displayDialog = false;
  tasks: any[] = []; // Lista de tarefas
  selectedTask: any = null; // Tarefa selecionada
  // Dados dos gráficos
  userHoursData: any;
  taskStatusData: any;
  projectProgressData: any;
  userActivityData: any;
  taskDistributionData: any;
  completedTask:any;
  ultimosLancamentos: any[] = [];

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {}
    }
  };

  loading = false; // Estado de carregamento para melhorar UX

  constructor(
    private timeEntryService: TimeEntryService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private  taskService: TaskService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.timeEntryForm = this.fb.group({
      taskId: [null, Validators.required],
      description: [null, Validators.required],
      entryDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser(); // Obtém o usuário logado
  if (!this.user) {
    console.error('Usuário não autenticado.');
    return;
  }
  this.role = this.user.role;  // Obtém a role diretamente do usuário logado

    this.loadTimeEntries();
    this.loadTasks(); // Carrega as tarefas do backend
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true; // Inicia o carregamento

    // Usando forkJoin para carregar dados para todos os papéis
    forkJoin({
      userHours: this.dashboardService.getUserHours(this.user.id),
      totalHoursMonth: this.dashboardService.getTotalHoursMonth(this.user.id),
      pendingTasksCount: this.dashboardService.getPendingTasksCount(this.user.id),
      taskDistribution: this.dashboardService.getTaskDistribution(this.user.id),
      completedTask: this.dashboardService.getCompletedTasksCount(this.user.id),
      // Aqui adicionamos a chamada para contar os projetos gerenciados
      projectsManaged: this.dashboardService.countProjectsByManager(this.user.id)
    }).subscribe(
      ({ userHours, totalHoursMonth, pendingTasksCount, taskDistribution, completedTask, projectsManaged }) => {
        // Gráfico de distribuição de tarefas
        this.taskDistributionData = {
          labels: Object.keys(taskDistribution).map(status => status.replace('_', ' ')),
          datasets: [{
            data: Object.values(taskDistribution),
            backgroundColor: ['#6366F1', '#FF9800', '#15B8A6', '#3B82F6', '#9E9E9E']
          }]
        };

        // Atribuindo os dados aos campos correspondentes
        this.totalHoursMonth = totalHoursMonth;
        this.pendingTasksCount = pendingTasksCount;
        this.totalProjectsManaged = projectsManaged; // Armazena o número de projetos gerenciados
        this.totalCompletedTask = completedTask;
        console.log('Completed Task:', this.completedTask);  // Verifique o valor no console
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar o dashboard.' });
      }
    );

      // ... restante do código
    }
  loadTasks(): void {
    this.loadingService.show();
    this.timeEntryService.getTasksByUserId(this.user.id).subscribe({
      next: (tasks) => {
        this.tasks = Array.isArray(tasks) ? tasks : [];
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar tarefas.' });
        this.tasks = [];
      }
    });
  }


  loadTimeEntries(): void {
    this.timeEntryService.getUserTimeEntries(this.user.id).subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  onTaskSelect(event: any): void {
    if (this.selectedTask) {
      // Atualiza o taskId no formulário com o ID da tarefa selecionada
      this.timeEntryForm.get('taskId')?.setValue(this.selectedTask.id);
    }
  }


  openDialog(): void {
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.timeEntryForm.reset();
    this.selectedTask = null; // Limpa a seleção da tarefa
  }

  saveTimeEntry(): void {
    if (this.timeEntryForm.valid) {
      const startTimeStr = this.formatTime(this.timeEntryForm.value.startTime);
      const endTimeStr = this.formatTime(this.timeEntryForm.value.endTime);

      // Convertendo as strings para uma data no formato ISO 8601
      const startDateTime = new Date(`1970-01-01T${startTimeStr}:00`);
      const endDateTime = new Date(`1970-01-01T${endTimeStr}:00`);

      // Verificar se a hora final é menor que a hora inicial
      if (endDateTime < startDateTime) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'A hora final não pode ser menor que a hora inicial.'
        });
        return;
      }

      const entry = {
        ...this.timeEntryForm.value,
        userId: this.user.id,
        startTime: startTimeStr,  // Mantém como string no formato HH:mm
        endTime: endTimeStr,      // Mantém como string no formato HH:mm
        totalHours: this.calculateTotalHours(startDateTime, endDateTime)
      };

      // Enviar os dados para o backend
      this.timeEntryService.saveTimeEntry(entry).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Horas adicionadas!' });
          this.loadTimeEntries();
          this.closeDialog();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar horas.' });
        }
      });
    }
  }

  formatTime(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;

    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }

  calculateTotalHours(startTime: Date, endTime: Date): number {
    const diff = endTime.getTime() - startTime.getTime();
    return diff / (1000 * 60 * 60);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.timeEntryForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  autoFormatTime(field: string): void {
    let value = this.timeEntryForm.get(field)?.value || '';
    value = value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }

    this.timeEntryForm.get(field)?.setValue(value.substring(0, 5));
  }

  carregarUltimosLancamentos(): void {
    this.timeEntryService.getUserTimeEntries(this.user.id).subscribe(entries => {
      const taskRequests = entries.map(entry =>
        this.taskService.getTaskById(entry.taskId).pipe(
          map(task => ({
            ...entry,
            descricao: entry.description,
            horas: entry.hoursLogged,
            data: entry.entryDate,
            taskName: task.name
          }))
        )
      );

      forkJoin(taskRequests).subscribe(results => {
        this.ultimosLancamentos = results;
        console.log('Últimos Lançamentos:', this.ultimosLancamentos); // Verificando no console
      });
    });
  }

}
