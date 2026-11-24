import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { apiError } from '../shared/api-error';
import { Client, ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['../shared/management.scss'],
  providers: [MessageService]
})
export class ClientsComponent implements OnInit {
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(30)]],
    cpf: ['', [Validators.required, Validators.maxLength(20)]],
    cnpj: [''],
    razaoSocial: [''],
    address: ['']
  });
  clients: Client[] = [];
  editingId?: number;
  loading = false;
  saving = false;
  dialog = false;
  error = '';
  formError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ClientsService,
    private readonly messages: MessageService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.service.list().pipe(finalize(() => this.loading = false)).subscribe({
      next: clients => this.clients = clients,
      error: error => this.error = apiError(error, 'Não foi possível carregar os clientes.')
    });
  }

  open(client?: Client): void {
    this.editingId = client?.id;
    this.form.reset();
    if (client) {
      this.form.patchValue({ ...client, address: client.address ?? '', cnpj: client.cnpj ?? '',
        razaoSocial: client.razaoSocial ?? '' });
    }
    this.formError = '';
    this.dialog = true;
  }

  save(): void {
    if (this.saving || this.form.invalid) return;
    this.formError = '';
    this.saving = true;
    this.service.save(this.form.getRawValue(), this.editingId)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.messages.add({ severity: 'success', summary: 'Cliente salvo' });
          this.dialog = false;
          this.load();
        },
        error: error => this.formError = apiError(error, 'Não foi possível salvar o cliente.')
      });
  }
}
