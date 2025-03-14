import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeEntryComponent } from './time-entry.component'; // Importe o componente
import { TableModule } from 'primeng/table'; // Importe o TableModule
import { DialogModule } from 'primeng/dialog'; // Importe o DialogModule
import { InputTextModule } from 'primeng/inputtext'; // Importe o InputTextModule
import { ButtonModule } from 'primeng/button'; // Importe o ButtonModule
import { ToastModule } from 'primeng/toast'; // Importe o ToastModule
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [TimeEntryComponent], // Declare o componente
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    TableModule, // Adicione o TableModule
    DialogModule, // Adicione o DialogModule
    InputTextModule, // Adicione o InputTextModule
    ButtonModule, // Adicione o ButtonModule
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    ToolbarModule


  ],
  exports: [TimeEntryComponent] // Exporte o componente
})
export class TimeEntryModule { }
