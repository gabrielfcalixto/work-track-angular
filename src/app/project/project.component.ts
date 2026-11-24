import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { Client, ClientsService } from '../clients/clients.service';
import { apiError } from '../shared/api-error';
import { ReportFormat, ReportService } from '../shared/report.service';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { Project, ProjectStatus, projectStatuses } from './project.model';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['../shared/management.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjectComponent implements OnInit {
  readonly statusLabels = projectStatuses;
  readonly statuses = Object.keys(projectStatuses) as ProjectStatus[];
  clients: Client[] = [];
  managers: Users[] = [];
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    hours: this.fb.control<number | null>(0, [Validators.required, Validators.min(0)]),
    status: this.fb.nonNullable.control<ProjectStatus>('NAO_INICIADO'),
    managerId: this.fb.control<number | null>(null, Validators.required),
    clientId: this.fb.control<number | null>(null, Validators.required),
    teamMemberIds: this.fb.nonNullable.control<number[]>([]),
    startDate: ['', Validators.required],
    deadline: ['', Validators.required]
  });
  records: Project[] = [];
  users: Users[] = [];
  editingId?: number;
  loading = false;
  saving = false;
  dialog = false;
  error = '';
  formError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ProjectService,
    private readonly clientsService: ClientsService,
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
    forkJoin({ records: this.service.list(), users: this.usersService.getUsers(), clients: this.clientsService.list() })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: ({ records, users, clients }) => {
          this.records = records;
          this.users = users;
          this.clients = clients;
          this.managers = users.filter(user => user.role !== 'USER');
        },
        error: error => this.error = apiError(error, 'Não foi possível carregar os projetos.')
      });
  }

  open(record?: Project): void {
    this.editingId = record?.id;
    this.form.reset();
    if (record) this.form.patchValue(record);
    this.managers = this.users.filter(user => user.role !== 'USER' || user.id === record?.managerId);
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
    if (fields.hours === null || fields.managerId === null || fields.clientId === null) return;
    const request = { ...fields, hours: fields.hours, managerId: fields.managerId, clientId: fields.clientId };
    this.saving = true;
    this.formError = '';
    this.service.save(request, this.editingId).pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.messages.add({ severity: 'success', summary: 'Projeto salvo' });
        this.dialog = false;
        this.load();
      },
      error: error => this.formError = apiError(error, 'Não foi possível salvar o projeto.')
    });
  }

  confirmDelete(record: Project): void {
    this.confirmation.confirm({
      header: 'Excluir projeto', message: `Excluir “${record.name}”?`, acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
      accept: () => this.service.delete(record.id).subscribe({
        next: () => {
          this.messages.add({ severity: 'success', summary: 'Projeto excluído' });
          this.load();
        },
        error: error => this.messages.add({ severity: 'error', summary: 'Erro',
          detail: apiError(error, 'Não foi possível excluir o projeto.') })
      })
    });
  }

  statusLabel(value: ProjectStatus): string {
    return this.statusLabels[value];
  }

  clientName(id: number): string {
    return this.clients.find(client => client.id === id)?.name ?? '—';
  }

  userName(id: number): string {
    return this.users.find(user => user.id === id)?.name ?? '—';
  }

  async export(format: ReportFormat): Promise<void> {
    try {
      await this.reports.download(format, 'Projetos', 'projetos', this.records.map(record => ({
        Projeto: record.name, Descrição: record.description, Horas: record.hours,
        Status: this.statusLabels[record.status], Início: record.startDate, Prazo: record.deadline,
        Cliente: this.clientName(record.clientId), Responsável: this.userName(record.managerId)
      })));
    } catch {
      this.messages.add({ severity: 'error', summary: 'Falha ao exportar o relatório' });
    }
  }
}
