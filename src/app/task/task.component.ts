import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Task } from 'zone.js/lib/zone-impl';


@Component({
  selector: 'app-user-management',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedUser: Task | null = null;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  searchTerm: string = '';
  newTask: Task = { name: '', description:'', hours:'', status: ''};

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTask().subscribe(
      task => {
        console.log(task);  // Verifique se os usuários estão sendo retornados
        this.task = task;
      },
      error => {
        console.error('Erro ao carregar as tasks:', error);
      }
    );
  }

  openAddDialog() {
    this.newTask = { name: '', description:'', hours:'', status: ''};
    this.displayAddDialog = true;
  }
  addUser() {
    this.taskService.addUser(this.newTask).subscribe(() => {
      this.displayAddDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Task adicionada!' });
      this.loadTask();

    });
  }
    gerarPDF() {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Relatório de Tarefas', 10, 10);

      let y = 20; // Posição inicial

      this.task.forEach((task, index) => {
        doc.setFontSize(12);
        doc.text(`Nome: ${task.name}`, 10, y);
        doc.text(`Description: ${task.description}`, 10, y + 6);
        doc.text(`Horas: ${task.hours}`, 10, y + 12);
        doc.text(`Status: ${task.status}`, 10, y + 18);

        y += 30; // Ajusta o espaçamento entre os usuários
      });

      doc.save('relatorio_usuarios.pdf');
    }


    gerarExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        this.task.map(task => ({
          Nome: task.name,
          Descrição: task.description,
          Horas: task.hours,
          Status: task.status
        }))
      );

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Tarefas');
      XLSX.writeFile(wb, 'relatorio_tarefas.xlsx');
    }


  openEditDialog(task: Task) {
    this.selectedUser = { ...task };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (this.selectedTask) {
      this.taskService.editUser(this.selectedTask).subscribe(() =>{
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa atualizada!' });
      this.loadTask();
    });
    }
  }

  openPermissionDialog(task: Task) {
    this.selectedUser = { ...task };
    this.displayPermissionDialog = true;
  }

  savePermissions() {
    if (this.selectedTask) {
      this.taskService.updatePermissions(this.selectedTask).subscribe(() =>{
      this.displayPermissionDialog = false;
      this.messageService.add({ severity: 'info', summary: 'Status atualizado', detail: 'Status da tarefa foi alterado!' });
    });
    }
  }

  confirmDelete(task: Task) {

    this.selectedTask ={...task};
    this.displayDeleteDialog = true;
  }

  deleteUser(task: Task) {
    if (!task || task.id === undefined) return; // Garante que o ID está presente
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.displayDeleteDialog = false;
      this.messageService.add({ severity: 'warn', summary: 'Tarefa removida', detail: 'Tarefa foi excluída!' });
      this.loadTask();
    });
  }

}
