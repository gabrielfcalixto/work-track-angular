import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    HttpClientModule


  ]
})
export class UsersModule { }
