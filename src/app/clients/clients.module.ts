import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, DialogModule, InputTextModule,
    TableModule, ToastModule, RouterModule.forChild([{ path: '', component: ClientsComponent }])]
})
export class ClientsModule {}
