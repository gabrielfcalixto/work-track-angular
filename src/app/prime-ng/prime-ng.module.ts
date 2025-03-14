import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule} from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    ProgressSpinnerModule,
    TableModule,
    AvatarModule,
    FieldsetModule


  ],
  exports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToolbarModule,
    DropdownModule,
    ProgressSpinnerModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    AvatarModule,
    ToastModule,
    MultiSelectModule

  ]
})
export class PrimeNGModule { }
