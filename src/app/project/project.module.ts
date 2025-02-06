import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FilterProjectPipe } from './filter-project.pipe';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    FilterProjectPipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CardModule,
    InputTextModule,
    DialogModule,
    FormsModule,



  ]
})
export class ProjectModule { }
