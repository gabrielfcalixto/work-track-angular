import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { AuthService, UserRole } from '../auth/auth.service';
import { apiError } from '../shared/api-error';
import { ReportFormat, ReportService } from '../shared/report.service';
import { userRoleLabels, Users } from './users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../shared/management.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit {
  readonly labels = userRoleLabels;
  readonly roles = Object.keys(userRoleLabels) as UserRole[];
  readonly currentId = this.auth.getLoggedUser()?.id;
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: this.fb.nonNullable.control<UserRole>('USER'),
    password: ['', Validators.minLength(8)]
  });
  users: Users[] = [];
  editingId?: number;
  loading = false;
  saving = false;
  dialog = false;
  error = '';
  formError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly service: UsersService,
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
    this.service.getUsers().pipe(finalize(() => this.loading = false)).subscribe({
      next: users => this.users = users,
      error: error => this.error = apiError(error, 'Não foi possível carregar os usuários.')
    });
  }

  open(user?: Users): void {
    this.editingId = user?.id;
    this.form.reset();
    if (user) this.form.patchValue(user);
    this.formError = '';
    this.dialog = true;
  }

  save(): void {
    if (this.saving || this.form.invalid) return;
    const { password, ...request } = this.form.getRawValue();
    const action: Observable<unknown> = this.editingId === undefined
      ? this.service.addUser({ ...request, password })
      : this.service.editUser(this.editingId, request);
    this.saving = true;
    this.formError = '';
    action.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.messages.add({ severity: 'success', summary: 'Usuário salvo' });
        this.dialog = false;
        this.load();
        if (this.editingId === this.currentId && request.login !== this.auth.getLoggedUser()?.username) {
          this.auth.logout();
        }
      },
      error: error => this.formError = apiError(error, 'Não foi possível salvar o usuário.')
    });
  }

  confirmDelete(user: Users): void {
    this.confirmation.confirm({
      header: 'Excluir usuário', message: `Excluir ${user.name}?`, acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
      accept: () => this.service.deleteUser(user.id).subscribe({
        next: () => {
          this.messages.add({ severity: 'success', summary: 'Usuário excluído' });
          this.load();
        },
        error: error => this.messages.add({ severity: 'error', summary: 'Erro',
          detail: apiError(error, 'Não foi possível excluir o usuário.') })
      })
    });
  }

  async export(format: ReportFormat): Promise<void> {
    try {
      await this.reports.download(format, 'Usuários', 'usuarios', this.users.map(user => ({
        Nome: user.name, Usuário: user.login, 'E-mail': user.email, 'Perfil de acesso': this.labels[user.role]
      })));
    } catch {
      this.messages.add({ severity: 'error', summary: 'Falha ao exportar o relatório' });
    }
  }
}
