import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
