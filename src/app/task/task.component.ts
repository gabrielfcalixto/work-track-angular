import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { Project } from '../project/project.model';
import { ProjectService } from '../project/project.service';
import { apiError } from '../shared/api-error';
import { ReportFormat, ReportService } from '../shared/report.service';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { Task, TaskPriority, TaskStatus, taskPriorityLabels, taskStatusLabels } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['../shared/management.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  readonly statusLabels = taskStatusLabels;
  readonly priorities = Object.keys(taskPriorityLabels) as TaskPriority[];
  readonly priorityLabels = taskPriorityLabels;
  readonly statuses = Object.keys(taskStatusLabels) as TaskStatus[];
  projects: Project[] = [];
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    estimatedHours: this.fb.control<number | null>(0, [Validators.required, Validators.min(0)]),
    status: this.fb.nonNullable.control<TaskStatus>('NAO_INICIADA'),
    priority: this.fb.nonNullable.control<TaskPriority>('MEDIA'),
    projectId: this.fb.control<number | null>(null, Validators.required),
    assignedUserIds: this.fb.nonNullable.control<number[]>([]),
    startDate: ['', Validators.required],
    deadline: ['', Validators.required]
  });
  records: Task[] = [];
  users: Users[] = [];
  editingId?: number;
  loading = false;
  saving = false;
  dialog = false;
  error = '';
  formError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: TaskService,
    private readonly projectsService: ProjectService,
    private readonly usersService: UsersService,
    private readonly messages: MessageService,
    private readonly confirmation: ConfirmationService,
    private readonly reports: ReportService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    forkJoin({ records: this.service.list(), users: this.usersService.getUsers(), projects: this.projectsService.list() })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: ({ records, users, projects }) => {
          this.records = records;
          this.users = users;
          this.projects = projects;
        },
        error: error => this.error = apiError(error, 'Não foi possível carregar as tarefas.')
      });
  }

  open(record?: Task): void {
    this.editingId = record?.id;
    this.form.reset();
    if (record) this.form.patchValue(record);
    if (record?.status === 'CONCLUIDA') this.form.controls.status.disable();
    else this.form.controls.status.enable();
    this.formError = '';
    this.dialog = true;
  }

  save(): void {
    if (this.saving || this.form.invalid) return;
    const fields = this.form.getRawValue();
    if (fields.deadline < fields.startDate) {
      this.formError = 'O prazo deve ser igual ou posterior à data de início.';
      return;
    }
    if (fields.estimatedHours === null || fields.projectId === null) return;
    const request = { ...fields, estimatedHours: fields.estimatedHours, projectId: fields.projectId };
    this.saving = true;
    this.formError = '';
    this.service.save(request, this.editingId).pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.messages.add({ severity: 'success', summary: 'Tarefa salva' });
        this.dialog = false;
        this.load();
      },
      error: error => this.formError = apiError(error, 'Não foi possível salvar a tarefa.')
    });
  }

  confirmDelete(record: Task): void {
    this.confirmation.confirm({
      header: 'Excluir tarefa', message: `Excluir “${record.name}”?`, acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
      accept: () => this.service.delete(record.id).subscribe({
        next: () => {
          this.messages.add({ severity: 'success', summary: 'Tarefa excluída' });
          this.load();
        },
        error: error => this.messages.add({ severity: 'error', summary: 'Erro',
          detail: apiError(error, 'Não foi possível excluir a tarefa.') })
      })
    });
  }

  statusLabel(value: TaskStatus): string {
    return this.statusLabels[value];
  }

  projectName(id: number): string {
    return this.projects.find(project => project.id === id)?.name ?? '—';
  }

  priorityLabel(value: TaskPriority): string {
    return this.priorityLabels[value];
  }

  async export(format: ReportFormat): Promise<void> {
    try {
      await this.reports.download(format, 'Tarefas', 'tarefas', this.records.map(record => ({
        Tarefa: record.name, Projeto: this.projectName(record.projectId), Descrição: record.description,
        'Horas estimadas': record.estimatedHours, 'Horas lançadas': record.totalHours,
        Status: this.statusLabels[record.status], Prioridade: this.priorityLabels[record.priority],
        Início: record.startDate, Prazo: record.deadline
      })));
    } catch {
      this.messages.add({ severity: 'error', summary: 'Falha ao exportar o relatório' });
    }
  }
}
