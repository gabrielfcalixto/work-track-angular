import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoModule } from '../components/chart/grafico.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel'; // Importe o módulo do Panel
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    GraficoModule,
    PrimeNGModule,
    HttpClientModule,
    ToastModule,
    DialogModule,
    CalendarModule,
    PanelModule,
    InputTextareaModule
    ],
  exports: [
    DashboardComponent
  ],
  providers: [TimeEntryService, MessageService, DialogService],
})
export class DashboardModule { }
