import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from './time-entry.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../loading/loading.service';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss'],
  providers: [MessageService],
})
export class TimeEntryComponent implements OnInit {
  user: any = null;
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
    private loadingService: LoadingService,
    private authService: AuthService // Injetando o serviço de autenticação
  ) {
    // Pega o usuário logado
    this.user = this.authService.getLoggedUser();
    console.log('Usuário logado:', this.user);

    this.timeEntryForm = this.fb.group({
      taskId: [null, Validators.required],
      description: [null, Validators.required],
      entryDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTimeEntries();
    this.loadTasks();
  }

  loadTimeEntries(): void {
    // Passa o ID do usuário para o serviço
    this.timeEntryService.getUserTimeEntries(this.user.id).subscribe({
      next: (entries) => {
        this.timeEntries = entries;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as entradas de tempo.',
        });
      },
    });
  }

  loadTasks(): void {
    this.loadingService.show();
    // Passa o ID do usuário para o serviço
    this.timeEntryService.getTasksByUserId(this.user.id).subscribe({
      next: (tasks) => {
        this.tasks = Array.isArray(tasks) ? tasks : [];
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar tarefas.',
        });
        this.tasks = [];
      },
    });
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
          detail: 'A hora final não pode ser menor que a hora inicial.',
        });
        return;
      }

      const entry = {
        ...this.timeEntryForm.value,
        userId: this.user.id, // Usa o ID do usuário logado
        startTime: startTimeStr,
        endTime: endTimeStr,
        totalHours: this.calculateTotalHours(startDateTime, endDateTime),
      };

      this.loadingService.show(); // Exibe o loading
      this.timeEntryService.saveTimeEntry(entry).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Horas adicionadas!',
          });
          this.loadTimeEntries();
          this.closeDialog();
          this.loadingService.hide(); // Esconde o loading
        },
        error: () => {
          this.loadingService.hide(); // Esconde o loading em caso de erro
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar horas.',
          });
        },
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

  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Tarefas', 10, 10);

    let y = 20; // Posição inicial

    this.timeEntries.forEach((timeEntry, index) => {
      doc.setFontSize(12);
      doc.text(`Tarefas: ${timeEntry.taskName}`, 10, y);
      doc.text(`Description: ${timeEntry.description}`, 10, y + 6);
      doc.text(`Horas Estimadas: ${timeEntry.entryDate}`, 10, y + 12);
      doc.text(`Horas Lançadas: ${timeEntry.startTime}`, 10, y + 18);
      doc.text(`Horas Lançadas: ${timeEntry.endTime}`, 10, y + 24);
      doc.text(`Status: ${timeEntry.status}`, 10, y + 30);

      y += 36; // Ajusta o espaçamento entre os usuários
    });

    doc.save('relatorio_usuarios.pdf');
  }

  gerarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.timeEntries.map((timeEntry) => ({
        Nome: timeEntry.taskName,
        Descrição: timeEntry.description,
        Horas_Estimadas: timeEntry.entryDate,
        Horas_Totais: timeEntry.startTime,
        Hora_Final: timeEntry.endTime,
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
      detail: err?.error?.message || defaultMessage,
    });
  }
}
