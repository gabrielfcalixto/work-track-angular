import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { TimeEntry } from '../time-entry/time-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: 'comum' | 'gestor' | 'admin' = 'comum';  // Exemplo: ajustar conforme o login
  userId = 1; // ID do usuário logado
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
  ultimosLancamentos: any[] = [];


 chartOptions: any = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: '#495057' }
    }
  }
};


  constructor(
    private timeEntryService: TimeEntryService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dashboardService: DashboardService
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
    if (this.userRole === 'comum') {
      this.dashboardService.getUserHours(this.userId).subscribe(data => {
        this.userHoursData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Horas Trabalhadas',
              data: data.values,
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
            }
          ]
        };
      });
    } else if (this.userRole === 'gestor') {
      this.dashboardService.getManagerStats(this.userId).subscribe(data => {
        this.projectProgressData = {
          labels: data.projects,
          datasets: [{ label: 'Progresso', data: data.progress, borderColor: '#42A5F5' }]
        };
      });
    } else if (this.userRole === 'admin') {
      this.dashboardService.getAdminStats().subscribe(data => {
        this.userActivityData = {
          labels: ['Usuários', 'Projetos', 'Tarefas'],
          datasets: [{ data: [data.totalUsers, data.totalProjects, data.totalTasks], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }]
        };
      });
    }
  }


  loadTasks(): void {
    this.timeEntryService.getTasksByUserId(this.userId).subscribe({
      next: (tasks) => {
        // Certifique-se de que tasks seja um array
        this.tasks = Array.isArray(tasks) ? tasks : [];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar tarefas.' });
        this.tasks = []; // Fallback: define tasks como um array vazio em caso de erro
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

      // Converte as strings para Date para poder comparar
      const startDateTime = new Date(`1970-01-01T${startTimeStr}`);
      const endDateTime = new Date(`1970-01-01T${endTimeStr}`);

      // Valida se a hora final é menor que a hora inicial
      if (endDateTime < startDateTime) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'A hora final não pode ser menor que a hora inicial.'
        });
        return; // Interrompe a execução
      }

      const entry = {
        ...this.timeEntryForm.value,
        userId: this.userId,
        startTime: startTimeStr,
        endTime: endTimeStr,
        totalHours: this.calculateTotalHours(startDateTime, endDateTime)
      };

      this.timeEntryService.saveTimeEntry(entry).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Horas adicionadas!' });
          this.loadTimeEntries();
          this.closeDialog();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar horas.' });
        }
      });
    }
  }


  formatTime(value: any): string {
    if (!value) return ''; // Evita erros com valores nulos
    if (typeof value === 'string') return value; // Se já for string, retorna como está

    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }


  // Método para calcular o total de horas
  calculateTotalHours(startTime: Date, endTime: Date): number {
    const diff = endTime.getTime() - startTime.getTime();
    return diff / (1000 * 60 * 60); // Converte milissegundos para horas
  }


  isFieldInvalid(field: string): boolean {
    const control = this.timeEntryForm.get(field);
    return !!(control?.invalid && control?.touched);
  }


  autoFormatTime(field: string): void {
    let value = this.timeEntryForm.get(field)?.value || '';

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Formata automaticamente HH:mm
    if (value.length >= 2) {
      value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }

    this.timeEntryForm.get(field)?.setValue(value.substring(0, 5)); // Limita a 5 caracteres
  }

  carregarUltimosLancamentos(): void {
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe(entries => {
      // Mapeia os dados para o formato da tabela
      this.ultimosLancamentos = entries.map(entry => ({
        atividade: entry.description,
        horas: entry.totalHours,
        data: entry.entryDate
      }));
    });
  }


}
