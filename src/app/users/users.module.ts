import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ConfirmDialogModule, DialogModule, InputTextModule,
    TableModule, ToastModule, RouterModule.forChild([{ path: '', component: UsersComponent }])]
})
export class UsersModule {}
