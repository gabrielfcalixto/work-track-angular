import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { apiError } from '../shared/api-error';
import { Task } from '../task/task.model';
import { TimeEntry, TimeEntryRequest } from './time-entry.model';
import { TimeEntryService } from './time-entry.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TimeEntryComponent implements OnInit {
  readonly today = this.localDate(new Date());
  readonly form = this.fb.nonNullable.group({
    taskId: this.fb.control<number | null>(null),
    description: ['', [Validators.required, Validators.maxLength(255)]],
    entryDate: [this.today, Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });
  entries: TimeEntry[] = [];
  visibleEntries: TimeEntry[] = [];
  tasks: Task[] = [];
  visibleHours = 0;
  filter = { from: '', to: '', task: '' };
  loading = false;
  saving = false;
  error = '';
  formError = '';
  displayDialog = false;
  editing?: TimeEntry;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: TimeEntryService,
    private readonly messages: MessageService,
    private readonly confirmation: ConfirmationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    forkJoin({ entries: this.service.listMine(), tasks: this.service.listMyTasks() })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: ({ entries, tasks }) => {
          this.entries = entries;
          this.tasks = tasks;
          this.applyFilters();
          if (this.route.snapshot.queryParamMap.get('novo') === '1') {
            this.openDialog();
            void this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
          }
        },
        error: error => this.error = apiError(error, 'Não foi possível carregar os lançamentos.')
      });
  }

  applyFilters(): void {
    const { from, to, task } = this.filter;
    const text = task.trim().toLocaleLowerCase('pt-BR');
    this.visibleEntries = this.entries.filter(entry =>
      (!from || entry.entryDate >= from) && (!to || entry.entryDate <= to)
      && (!text || entry.taskName.toLocaleLowerCase('pt-BR').includes(text)));
    this.visibleHours = this.visibleEntries.reduce((sum, entry) => sum + entry.hoursLogged, 0);
  }

  clearFilters(): void {
    this.filter = { from: '', to: '', task: '' };
    this.applyFilters();
  }

  openDialog(entry?: TimeEntry): void {
    this.editing = entry;
    this.formError = '';
    this.form.reset(entry ?? { entryDate: this.today });
    this.displayDialog = true;
  }

  save(): void {
    if (this.saving) return;
    const values = this.form.getRawValue();
    const description = values.description.trim();
    if (this.form.invalid || !description || (!this.editing && values.taskId === null)) {
      this.formError = 'Preencha todos os campos.';
      return;
    }
    if (values.entryDate > this.today || values.endTime <= values.startTime) {
      this.formError = 'Use uma data até hoje e um horário final posterior ao inicial.';
      return;
    }

    const request: TimeEntryRequest = { ...values, description, taskId: values.taskId ?? undefined };
    const action = this.editing ? this.service.update(this.editing.id, request) : this.service.create(request);
    this.formError = '';
    this.saving = true;
    action.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.displayDialog = false;
        this.messages.add({ severity: 'success', summary: 'Lançamento salvo' });
        this.load();
      },
      error: error => this.formError = apiError(error, 'Não foi possível salvar o lançamento.')
    });
  }

  confirmDelete(entry: TimeEntry): void {
    this.confirmation.confirm({
      header: 'Excluir lançamento',
      message: 'As horas deste lançamento serão retiradas do total da tarefa.',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      accept: () => this.delete(entry.id)
    });
  }

  async exportExcel(): Promise<void> {
    const rows = this.visibleEntries.map(entry => ({
      Tarefa: entry.taskName, Descrição: entry.description, Data: entry.entryDate,
      Início: entry.startTime, Fim: entry.endTime, Horas: entry.hoursLogged
    }));
    try {
      const { utils, writeFile } = await import('xlsx');
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, utils.json_to_sheet(rows), 'Lançamentos');
      writeFile(workbook, 'work-track-lancamentos.xlsx');
    } catch {
      this.messages.add({ severity: 'error', summary: 'Falha ao exportar Excel' });
    }
  }

  async exportPdf(): Promise<void> {
    const entries = this.visibleEntries;
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Lançamentos de horas', 14, 18);
      doc.setFontSize(10);
      let y = 29;
      for (const entry of entries) {
        const hours = entry.hoursLogged.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
        const date = entry.entryDate.split('-').reverse().join('/');
        const lines: string[] = doc.splitTextToSize(
          `${date} · ${entry.startTime}–${entry.endTime} · ${hours} h\n${entry.taskName}\n${entry.description}`, 182);
        const rowHeight = 5 * lines.length + 5;
        if (y + rowHeight > 282) {
          doc.addPage();
          y = 18;
        }
        doc.text(lines, 14, y);
        y += rowHeight;
      }
      doc.save('work-track-lancamentos.pdf');
    } catch {
      this.messages.add({ severity: 'error', summary: 'Falha ao exportar PDF' });
    }
  }

  private delete(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.messages.add({ severity: 'success', summary: 'Lançamento excluído' });
        this.load();
      },
      error: error => this.messages.add({ severity: 'error', summary: 'Erro',
        detail: apiError(error, 'Não foi possível excluir o lançamento.') })
    });
  }

  private localDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
