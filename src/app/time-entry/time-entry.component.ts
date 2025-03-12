import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from './time-entry.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../loading/loading.service';

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
  ultimosLancamentos: any[] = [];


  constructor(
    private fb: FormBuilder,
    private timeEntryService: TimeEntryService,
    private messageService: MessageService,
    private loadingService: LoadingService
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
    this.loadingService.show(); // Exibe o loading
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe({
      next: (entries) => {
        this.timeEntries = entries;
        this.loadingService.hide(); // Esconde o loading
      },
      error: () => {
        this.loadingService.hide(); // Esconde o loading em caso de erro
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar as entradas de tempo.' });
      }
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
      const startTimeStr = this.formatTime(this.timeEntryForm.value.startTime);
      const endTimeStr = this.formatTime(this.timeEntryForm.value.endTime);

      const startDateTime = new Date(`1970-01-01T${startTimeStr}`);
      const endDateTime = new Date(`1970-01-01T${endTimeStr}`);

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
        startTime: startTimeStr,
        endTime: endTimeStr,
        totalHours: this.calculateTotalHours(startDateTime, endDateTime)
      };

      this.loadingService.show(); // Exibe o loading
      this.timeEntryService.saveTimeEntry(entry).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Horas adicionadas!' });
          this.loadTimeEntries();
          this.closeDialog();
          this.loadingService.hide(); // Esconde o loading
        },
        error: () => {
          this.loadingService.hide(); // Esconde o loading em caso de erro
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

  // Método para tratar a seleção de tarefa
  onTaskSelect(event: any): void {
    this.selectedTask = event.value;
    this.timeEntryForm.get('taskId')?.setValue(this.selectedTask.id);
  }
}
