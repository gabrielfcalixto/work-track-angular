import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ConfirmDialogModule, DialogModule, InputTextModule,
    InputTextareaModule, MultiSelectModule, TableModule, ToastModule, RouterModule.forChild([{ path: '', component: ProjectComponent }])]
})
export class ProjectModule {}
