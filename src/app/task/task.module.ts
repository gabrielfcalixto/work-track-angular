import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    HttpClientModule,
    MultiSelectModule,
    InputTextareaModule

  ],
})
export class TaskModule { }
