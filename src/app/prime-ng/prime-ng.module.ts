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
    TableModule,
    DropdownModule
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
    DropdownModule
  ]
})
export class PrimeNGModule { }
