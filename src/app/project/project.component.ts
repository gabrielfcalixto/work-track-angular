import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Project } from './project.model';
import { ProjectService } from './project.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjectComponent implements OnInit {
  project: Project[] = [];
  selectedProject: Project | null = null;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  searchTerm: string = '';
  newProject: Project = { name: '', description:'', hours: 0, status: ''};

  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getProjects().subscribe(
      project => {
        console.log(project);  // Verifique se os usuários estão sendo retornados
        this.project = project;
      },
      error => {
        console.error('Erro ao carregar as projects:', error);
      }
    );
  }

  openAddDialog() {
    this.newProject = { name: '', description:'', hours:0, status: ''};
    this.displayAddDialog = true;
  }
  addProject() {
    this.projectService.addProject(this.newProject).subscribe(() => {
      this.displayAddDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Project adicionada!' });
      this.loadProject();

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


  openEditDialog(project: Project) {
    this.selectedProject = { ...project };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (this.selectedProject) {
      this.projectService.editProject(this.selectedProject).subscribe(() =>{
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa atualizada!' });
      this.loadProject();
    });
    }
  }

  openStatusDialog(project: Project) {
    this.selectedProject = { ...project };
    this.displayPermissionDialog = true;
  }

  saveStatus() {
    if (this.selectedProject) {
      this.projectService.updateStatus(this.selectedProject).subscribe(() =>{
      this.displayPermissionDialog = false;
      this.messageService.add({ severity: 'info', summary: 'Status atualizado', detail: 'Status do projeto foi alterado!' });
    });
    }
  }

  confirmDelete(project: Project) {

    this.selectedProject ={...project};
    this.displayDeleteDialog = true;
  }

  deleteUser(project: Project) {
    if (!project || project.id === undefined) return; // Garante que o ID está presente
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.displayDeleteDialog = false;
      this.messageService.add({ severity: 'warn', summary: 'Projeto removido', detail: 'Projeto foi excluído!' });
      this.loadProject();
    });
  }

}
