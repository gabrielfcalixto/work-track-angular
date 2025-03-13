import { UsersService } from './../users/users.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { Users } from '../users/users.model';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjectComponent implements OnInit {
  project: Project[] = [];
  users: Users[] = []; // Lista de usuários
  selectedProject: Project = {} as Project;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  searchTerm: string = '';
  status = [
    { name: 'Pendente', value: 'NAO_INICIADA' },   // Mapeando para o enum
    { name: 'Em andamento', value: 'EM_ANDAMENTO' },
    { name: 'Concluído', value: 'CONCLUIDO' },
    { name: 'Em espera', value: 'EM_ESPERA' },
    { name: 'Cancelada', value: 'CANCELADA' },
  ];

  newProject: Project = {
    name: '',
    description: '',
    hours: 0,
    status: '',
    managerId: undefined,
    clientId: undefined,
    teamMemberIds: [],
    startDate: '',
    deadline: ''
  };
  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UsersService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadProject();
    this.loadUsers();
  }
  loadProject() {
    this.loadingService.show();
    this.projectService.getProjects().subscribe(
      project => {
        console.log(project);  // Verifique se os usuários estão sendo retornados
        this.project = project;
        this.loadingService.hide();
      },
      error => {
        console.error('Erro ao carregar as projects:', error);
        this.loadingService.hide();
      }
    );
  }
  getStatusName(statusValue: string): string {
    const status = this.status.find(option => option.value === statusValue);
    return status ? status.name : 'Desconhecido';
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

  openAddDialog() {
    this.newProject = {   name: '',
      description: '',
      hours: 0,
      status: '',
      managerId: undefined,
      clientId: undefined,
      teamMemberIds: [],
      startDate: '',
      deadline: '' };
    this.displayAddDialog = true;
  }

  addProject() {
    this.loadingService.show();
    this.projectService.addProject(this.newProject).subscribe({
      next: () => {
        this.displayAddDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa adicionada!'
        });
        this.loadProject();
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error.message || 'Falha ao adicionar a tarefa. Tente novamente.'
        });
      }
    });
  }
  openEditDialog(project: Project) {
    this.selectedProject = { ...project };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (!this.selectedProject) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nenhuma tarefa selecionada!' });
      return;
    }

    if (!this.selectedProject.name || !this.selectedProject.description || !this.selectedProject.hours || !this.selectedProject.status || !this.selectedProject.clientId || !this.selectedProject.teamMemberIds || !this.selectedProject.deadline) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios!' });
      return;
    }

    this.loadingService.show();

    this.projectService.editProject(this.selectedProject).subscribe(() => {
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
      this.loadProject();
      this.loadingService.hide();
    });
  }
  openStatusDialog(project: Project) {
    this.selectedProject = { ...project };
    this.displayPermissionDialog = true;
  }

  saveStatus() {
    if (this.selectedProject && this.selectedProject.status && this.selectedProject.id !== undefined) {
      this.loadingService.show();

      const statusValue = this.selectedProject.status;

      this.projectService.updateStatus(this.selectedProject.id, { status: statusValue }).subscribe({
        next: () => {
          this.displayPermissionDialog = false;
          this.loadingService.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Status atualizado',
            detail: 'Status da tarefa foi alterado!'
          });
          this.loadProject(); // Atualiza a lista de tarefas
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


  confirmDelete(project: Project) {

    this.selectedProject ={...project};
    this.displayDeleteDialog = true;
  }


  deleteProject(project: Project) {
    if (!project || project.id === undefined) return;

    this.loadingService.show();

    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.displayDeleteDialog = false;
        this.messageService.add({ severity: 'warn', summary: 'Tarefa removida', detail: 'Tarefa foi excluída!' });
        this.loadProject();
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

    this.project.forEach((project, index) => {
      doc.setFontSize(12);
      doc.text(`Nome: ${project.name}`, 10, y);
      doc.text(`Description: ${project.description}`, 10, y + 6);
      doc.text(`Horas: ${project.hours}`, 10, y + 12);
      doc.text(`Status: ${project.status}`, 10, y + 18);

      y += 30; // Ajusta o espaçamento entre os usuários
    });

    doc.save('relatorio_usuarios.pdf');
  }


  gerarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.project.map(project => ({
        Nome: project.name,
        Descrição: project.description,
        Horas: project.hours,
        Status: project.status
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tarefas');
    XLSX.writeFile(wb, 'relatorio_tarefas.xlsx');
  }


}
