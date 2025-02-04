import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    FormsModule
  ]
})
export class PrimeNGModule { }
