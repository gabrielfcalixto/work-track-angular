import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { ToolbarModule } from 'primeng/toolbar';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrimeNGModule,


  ]
})
export class UsersModule { }
