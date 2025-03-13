import { TaskService } from './../task/task.service';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { TimeEntry } from '../time-entry/time-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { MessageService } from 'primeng/api';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: 'comum' | 'gestor' | 'admin' = 'comum';  // Exemplo: ajustar conforme o login
  userId = 1; // ID do usuário logado
  totalHoursMonth: number = 0;  // Total de horas lançadas no mês
  pendingTasksCount: number = 0;  // Contagem de tarefas pendentes
  completedTasksCount: number = 0;  // Tarefas completadas (gestor)
  ongoingTasksCount: number = 0;  // Tarefas em andamento (gestor)
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
    this.userRole = 'comum';  // Pode ser 'comum', 'gestor' ou 'admin'
    this.loadTimeEntries();
    this.loadTasks(); // Carrega as tarefas do backend
    this.loadDashboardData();
    this.carregarUltimosLancamentos();
  }

  loadDashboardData() {
    this.loading = true; // Inicia o carregamento
    if (this.userRole === 'comum') {
      this.dashboardService.getUserHours(this.userId).subscribe(data => {
        // Supondo que o backend retorne 'labels' e 'values' para gráficos
        this.userHoursData = {
          labels: data.labels,  // Labels para os gráficos
          datasets: [{
            label: 'Horas Trabalhadas',
            data: data.values,   // Dados para os gráficos
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }]
        };

        // Atualiza o total de horas no mês
        this.totalHoursMonth = data.totalHoursMonth;  // Supondo que o backend retorne esse valor
        this.loading = false;
      }, error => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar os dados.' });
      });

      // Carregar tarefas pendentes
      this.dashboardService.getPendingTasksCount(this.userId).subscribe(data => {
        this.pendingTasksCount = data.count;  // Supondo que o backend retorne esse valor
      });
    } else if (this.userRole === 'gestor') {
      this.dashboardService.getManagerStats(this.userId).subscribe(data => {
        // Supondo que o backend retorne os dados de progresso de projetos
        this.projectProgressData = {
          labels: data.projects,  // Projetos
          datasets: [{
            label: 'Progresso',
            data: data.progress,   // Progresso dos projetos
            borderColor: '#42A5F5'
          }]
        };

        // Carregar tarefas completadas e em andamento
        this.completedTasksCount = data.completedTasksCount;  // Supondo que o backend retorne isso
        this.ongoingTasksCount = data.ongoingTasksCount;  // Supondo que o backend retorne isso

        this.loading = false;
      }, error => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar os dados de progresso dos projetos.' });
      });
    }
}


  loadTasks(): void {
    this.loading = true;
    this.timeEntryService.getTasksByUserId(this.userId).subscribe({
      next: (tasks) => {
        this.tasks = Array.isArray(tasks) ? tasks : [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar tarefas.' });
        this.tasks = [];
      }
    });
  }

  loadTimeEntries(): void {
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  onTaskSelect(event: any): void {
    if (this.selectedTask) {
      this.timeEntryForm.get('taskId')?.setValue(this.selectedTask.id); // Atualiza o taskId no formulário
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
        userId: this.userId,
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
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe(entries => {
      const taskRequests = entries.map(entry =>
        this.taskService.getTaskById(entry.taskId).pipe(
          map(task => ({
            ...entry,  // Mantém as informações da entrada de tempo
            descricao: entry.description,
            horas: entry.hoursLogged,
            data: entry.entryDate,
            taskName: task.name  // Adiciona o nome da tarefa
          }))
        )
      );

      // Quando todas as chamadas de tarefa forem concluídas
      forkJoin(taskRequests).subscribe(results => {
        this.ultimosLancamentos = results;
      });
    });
  }
}
