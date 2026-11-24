import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TimeEntryComponent } from './time-entry.component';

@NgModule({
  declarations: [TimeEntryComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, ConfirmDialogModule, DialogModule,
    DropdownModule, InputTextModule, InputTextareaModule, TableModule, ToastModule,
    RouterModule.forChild([{ path: '', component: TimeEntryComponent }])]
})
export class TimeEntryModule {}
