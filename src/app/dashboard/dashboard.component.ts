import { Component, OnInit } from '@angular/core';
import { TimeEntry } from '../time-entry/time-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userRole: 'comum' | 'gestor' | 'admin' = 'comum';  // Exemplo: ajustar conforme o login
  userId = 1; // ID do usuário logado
  timeEntries: TimeEntry[] = [];
  timeEntryForm: FormGroup;
  displayDialog = false;
  tasks: any[] = []; // Lista de tarefas
  selectedTask: any = null; // Tarefa selecionada

  constructor(
    private timeEntryService: TimeEntryService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.timeEntryForm = this.fb.group({
      taskId: [null, Validators.required],
      description: [null, Validators.required],
      entryDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }
  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#495057'
        }
      }
    },
  };

  taskData = {
    labels: ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'],
    datasets: [
      {
        label: 'Tarefas Concluídas',
        data: [12, 19, 3],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  taskStatusData = {
    labels: ['Concluídas', 'Em Progresso', 'Pendentes'],
    datasets: [
      {
        data: [10, 5, 2],
        backgroundColor: ['#66BB6A', '#FFA726', '#FF6384']
      }
    ]
  };
  ultimosLancamentos = [
    { atividade: 'Implementação de API', horas: 4, data: '10/03/2025' },
    { atividade: 'Reunião com Cliente', horas: 2, data: '09/03/2025' },
    { atividade: 'Correção de Bugs', horas: 3, data: '08/03/2025' }
  ];


  projectProgressData = {
    labels: ['Projeto A', 'Projeto B', 'Projeto C'],
    datasets: [
      {
        label: 'Progresso',
        data: [60, 80, 40],
        borderColor: '#42A5F5'
      }
    ]
  };

  taskAllocationData = {
    labels: ['Backend', 'Frontend', 'DevOps', 'Testes'],
    datasets: [
      {
        data: [25, 35, 20, 20],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
      }
    ]
  };

  userActivityData = {
    labels: ['Criar', 'Editar', 'Excluir', 'Visualizar'],
    datasets: [
      {
        label: 'Atividades',
        data: [10, 5, 2, 20],
        backgroundColor: '#42A5F5'
      }
    ]
  };

  systemUsageData = {
    labels: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  ngOnInit() {
    this.userRole = 'comum';  // Pode ser 'comum', 'gestor' ou 'admin'
    this.loadTimeEntries();
    this.loadTasks(); // Carrega as tarefas do backend
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
      const entry = {
        ...this.timeEntryForm.value,
        userId: this.userId,
        taskId: this.selectedTask ? this.selectedTask.id : null // Garante que o taskId seja passado corretamente
      };
      this.timeEntryService.saveTimeEntry(entry).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Horas adicionadas!' });
          this.closeDialog();
          this.loadTimeEntries(); // Recarrega as entradas após salvar
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar horas!' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Campos Obrigatórios', detail: 'Preencha todos os campos corretamente.' });
    }
  }

}
