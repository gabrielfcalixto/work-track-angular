import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { GraficoModule } from '../components/chart/grafico.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    GraficoModule  // ✅ Importando módulo com o `app-chart`
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
