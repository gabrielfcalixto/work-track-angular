import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Task } from './task.model';
import { TaskService } from './task.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  displayAddDialog = false;
  displayEditDialog = false;
  displayPermissionDialog = false;
  displayDeleteDialog = false;
  filteredTasks: Task[] = [];
  searchText: string = '';
  statusOptions = [
    { name: 'Pendente', value: 'PENDENTE' },
    { name: 'Em andamento', value: 'EM_ANDAMENTO' },
    { name: 'Concluída', value: 'CONCLUIDA' },
  ];

  newTask: Task = { name: '', description: '', estimatedHours: 0, totalHours: 0, status: '' };

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTasks().subscribe(
      tasks => {
        console.log(tasks); // Verifique se as tarefas estão sendo retornadas
        this.tasks = tasks;
        this.filteredTasks = tasks; // Atualize filteredTasks com os dados recebidos
      },
      error => {
        console.error('Erro ao carregar as tasks:', error);
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
    this.newTask = { name: '', description: '', estimatedHours: 0, totalHours: 0, status: '' };
    this.displayAddDialog = true;
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.displayAddDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa adicionada!' });
      this.loadTask();
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


  openEditDialog(task: Task) {
    this.selectedTask = { ...task };
    this.displayEditDialog = true;
  }

  saveEdit() {
    if (this.selectedTask) {
      this.taskService.editTask(this.selectedTask).subscribe(() =>{
      this.displayEditDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa atualizada!' });
      this.loadTask();
    });
    }
  }

  openStatusDialog(task: Task) {
    this.selectedTask = { ...task };
    this.displayPermissionDialog = true;
  }

  saveStatus() {
    if (this.selectedTask) {
      this.taskService.updateStatus(this.selectedTask).subscribe(() =>{
      this.displayPermissionDialog = false;
      this.messageService.add({ severity: 'info', summary: 'Status atualizado', detail: 'Status da tarefa foi alterado!' });
    });
    }
  }

  confirmDelete(task: Task) {

    this.selectedTask ={...task};
    this.displayDeleteDialog = true;
  }

  deleteTask(task: Task) {
    if (!task || task.id === undefined) return; // Garante que o ID está presente
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.displayDeleteDialog = false;
      this.messageService.add({ severity: 'warn', summary: 'Tarefa removida', detail: 'Tarefa foi excluída!' });
      this.loadTask();
    });
  }
}
