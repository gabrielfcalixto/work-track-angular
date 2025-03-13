import { Users } from './../users/users.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.model';
import { UsersService } from '../users/users.service';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  projects: Project[] = []; // Lista de projetos
  users: Users[] = []; // Lista de usuários
  selectedTask: Task = {} as Task;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  filteredTasks: Task[] = [];
  searchText: string = '';
  status = [
    { name: 'Pendente', value: 'NAO_INICIADA' },
    { name: 'Em andamento', value: 'EM_ANDAMENTO' },
    { name: 'Concluída', value: 'CONCLUIDA' },
    { name: 'Em espera', value: 'EM_ESPERA' },
    { name: 'Cancelada', value: 'CANCELADA' },
  ];

  priorityOptions = [
    { name: 'Baixa', value: 'BAIXA' },
    { name: 'Média', value: 'MEDIA' },
    { name: 'Alta', value: 'ALTA' }
  ];


  newTask: Task = {
    name: '',
    description: '',
    estimatedHours: 0,
    totalHours: 0,
    status: '',
    priority: '', // Novo campo adicionado
    projectId: undefined, // Referente ao ID do projeto
    assignedUserIds: [], // Lista de IDs dos usuários atribuídos
    startDate: '', // Novo campo adicionado
    deadline: '' // Novo campo adicionado
  };


  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private projectService: ProjectService, 
    private userService: UsersService,
    private loadingService: LoadingService

  ) {}

  ngOnInit() {
    this.loadTask();
    this.loadProjects();
    this.loadUsers();
  }

  loadTask() {
    this.loadingService.show();

    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = [...tasks];
        this.loadingService.hide();

      },
      error => {
        console.error('Erro ao carregar as tasks:', error);
      this.loadingService.hide();

      }

    );
  }
  getStatusName(statusValue: string): string {
    const status = this.status.find(option => option.value === statusValue);
    return status ? status.name : 'Desconhecido';
  }


  loadProjects() {
    this.loadingService.show();
    this.projectService.getProjects().subscribe(
      (projects) => {
        console.log('Projetos recebidos:', projects);
        this.projects = projects;

      },
      (error) => {
        console.error('Erro ao carregar os projetos:', error);

      }
    );
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erro ao carregar os usuários', error);
      }
    );
  }


  filterTasks() {
    if (!this.searchText) {
      this.filteredTasks = this.tasks; // Se não houver texto de pesquisa, exibe todas as tarefas
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.estimatedHours.toString().includes(searchLower) || // Corrigido
      task.totalHours.toString().includes(searchLower) || // Corrigido
      task.status.toLowerCase().includes(searchLower)
    );
  }
  openAddDialog() {
    this.newTask = {
      name: '',
      description: '',
      estimatedHours: 0,
      totalHours: 0,
      status: '',
      priority: '', // Novo campo adicionado
      projectId: undefined, // ID do projeto
      assignedUserIds: [], // Lista de IDs de usuários atribuídos
      startDate: '', // Novo campo adicionado
      deadline: '' // Novo campo adicionado
    };
    this.displayAddDialog = true;
  }

  addTask() {
    this.loadingService.show(); // Exibe o loading

    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.displayAddDialog = false; // Fecha o diálogo
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa adicionada!'
        });
        this.loadTask(); // Recarrega a lista de tarefas
        this.loadingService.hide(); // Esconde o loading
      },
      error: (err) => {
        this.loadingService.hide(); // Esconde o loading em caso de erro

        // Exibe uma mensagem de erro
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error.message || 'Falha ao adicionar a tarefa. Tente novamente.'
        });
      }
    });
  }

    openEditDialog(task: Task) {
      this.selectedTask = { ...task };
      this.displayEditDialog = true;
    }

    saveEdit() {
      if (!this.selectedTask) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nenhuma tarefa selecionada!' });
        return;
      }

      if (!this.selectedTask.name || !this.selectedTask.description || !this.selectedTask.estimatedHours || !this.selectedTask.status || !this.selectedTask.priority || !this.selectedTask.assignedUserIds || !this.selectedTask.deadline) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios!' });
        return;
      }

      this.loadingService.show();

      this.taskService.editTask(this.selectedTask).subscribe(() => {
        this.displayEditDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
        this.loadTask();
        this.loadingService.hide();
      });
    }


  openStatusDialog(task: Task) {
    this.selectedTask = { ...task };
    this.displayPermissionDialog = true;
  }

  saveStatus() {
    if (this.selectedTask && this.selectedTask.status && this.selectedTask.id !== undefined) {
      this.loadingService.show();

      const statusValue = this.selectedTask.status;

      this.taskService.updateStatus(this.selectedTask.id, { status: statusValue }).subscribe({
        next: () => {
          this.displayPermissionDialog = false;
          this.loadingService.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Status atualizado',
            detail: 'Status da tarefa foi alterado!'
          });
          this.loadTask(); // Atualiza a lista de tarefas
        },
        error: (err) => {
          this.loadingService.hide();
          console.error('Erro ao atualizar status:', err);

          // Verifica se a mensagem específica está em outro lugar
          const errorMessage =
            err?.error?.message ||
            err?.error ||
            err?.message ||
            'Falha ao alterar o status. Tente novamente.';

          // Tratamento específico para a exceção de reabertura de tarefa concluída
          if (errorMessage.includes('Não é possível reabrir uma tarefa já concluída')) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação não permitida',
              detail: 'Não é possível reabrir uma tarefa que já foi concluída.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao atualizar status',
              detail: errorMessage
            });
          }
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Nenhuma tarefa selecionada',
        detail: 'Selecione uma tarefa antes de atualizar o status.'
      });
    }
  }


  confirmDelete(task: Task) {
    this.selectedTask = { ...task };
    this.displayDeleteDialog = true;
  }

  deleteTask(task: Task) {
    if (!task || task.id === undefined) return;

    this.loadingService.show();

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.displayDeleteDialog = false;
        this.messageService.add({ severity: 'warn', summary: 'Tarefa removida', detail: 'Tarefa foi excluída!' });
        this.loadTask();
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();

        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao excluir',
          detail: err?.error?.message || 'Falha ao excluir a tarefa. Tente novamente.'
        });
      }
    });
  }


  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Tarefas', 10, 10);

    let y = 20; // Posição inicial

    this.tasks.forEach((task, index) => {
      doc.setFontSize(12);
      doc.text(`Nome: ${task.name}`, 10, y);
      doc.text(`Description: ${task.description}`, 10, y + 6);
      doc.text(`Horas Estimadas: ${task.estimatedHours}`, 10, y + 12);
      doc.text(`Horas Lançadas: ${task.totalHours}`, 10, y + 18);

      doc.text(`Status: ${task.status}`, 10, y + 24);

      y += 30; // Ajusta o espaçamento entre os usuários
    });

    doc.save('relatorio_usuarios.pdf');
  }


  gerarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.tasks.map(task => ({
        Nome: task.name,
        Descrição: task.description,
        Horas_Estimadas: task.estimatedHours,
        Horas_Totais: task.totalHours,

        Status: task.status
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tarefas');
    XLSX.writeFile(wb, 'relatorio_tarefas.xlsx');
  }

  private showErrorMessage(defaultMessage: string, err: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: err?.error?.message || defaultMessage
    });
  }


}
