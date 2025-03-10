import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from './chart.component';



@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    ChartComponent
  ]
})
export class GraficoModule { }
