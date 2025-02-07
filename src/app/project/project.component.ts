import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import {  DialogService } from 'primeng/dynamicdialog';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { Project } from './project.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];  // Usando a interface Project

  constructor(
    private projectService: ProjectService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data; // Supondo que 'data' seja um array de objetos do tipo Project
    });
  }

  openAddProjectDialog() {
    const dialogRef = this.dialogService.open(AddProjectComponent, {
      header: 'Add New Project',
      width: '50%',
      data: { action: 'add' }
    });

    dialogRef.onClose.subscribe(result => {
      if (result) {
        this.loadProjects(); // Recarregar projetos após adicionar
      }
    });
  }

  openEditProjectDialog(projectId: string) {
    const dialogRef = this.dialogService.open(EditProjectComponent, {
      header: 'Edit Project',
      width: '50%',
      data: { projectId, action: 'edit' }
    });

    dialogRef.onClose.subscribe(result => {
      if (result) {
        this.loadProjects(); // Recarregar projetos após editar
      }
    });
  }
}
