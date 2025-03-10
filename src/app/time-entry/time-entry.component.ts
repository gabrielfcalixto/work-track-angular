import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from './time-entry.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss'],
  providers: [MessageService]
})
export class TimeEntryComponent implements OnInit {
  userId = 1; // Simulando usuário logado
  timeEntries: any[] = [];
  displayDialog = false;
  timeEntryForm: FormGroup;
  tasks: any[] = []; // Lista de tarefas
  selectedTask: any; // Tarefa selecionada

  constructor(
    private fb: FormBuilder,
    private timeEntryService: TimeEntryService,
    private messageService: MessageService
  ) {
    this.timeEntryForm = this.fb.group({
      taskId: [null, Validators.required],
      description: [null, Validators.required],
      entryDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTimeEntries();
    this.loadTasks(); // Carrega as tarefas disponíveis
  }

  loadTimeEntries(): void {
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  loadTasks(): void {
    // Carrega as tarefas do backend ou de um serviço
    this.tasks = [
      { id: 1, name: 'Tarefa 1' },
      { id: 2, name: 'Tarefa 2' }
    ];
  }

  openDialog(): void {
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.timeEntryForm.reset();
  }

  saveTimeEntry(): void {
    if (this.timeEntryForm.valid) {
      const entry = {
        ...this.timeEntryForm.value,
        userId: this.userId,
        startTime: this.formatTime(this.timeEntryForm.value.startTime), // Formata a hora
        endTime: this.formatTime(this.timeEntryForm.value.endTime), // Formata a hora
        totalHours: this.calculateTotalHours(this.timeEntryForm.value.startTime, this.timeEntryForm.value.endTime)
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

  // Método para formatar a hora no formato HH:mm:ss
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`; // Adiciona segundos como 00
  }

  // Método para calcular o total de horas
  calculateTotalHours(startTime: Date, endTime: Date): number {
    const diff = endTime.getTime() - startTime.getTime();
    return diff / (1000 * 60 * 60); // Converte milissegundos para horas
  }

  // Método para tratar a seleção de tarefa
  onTaskSelect(event: any): void {
    this.selectedTask = event.value;
    this.timeEntryForm.get('taskId')?.setValue(this.selectedTask.id);
  }
}
