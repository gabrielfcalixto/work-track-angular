import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimeNGModule,
    ReactiveFormsModule

  ]
})
export class TimeEntryModule { }
