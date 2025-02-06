import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ActivityComponent } from './activity.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ActivityComponent,
    ListActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule,
    PrimeNGModule
  ],
  exports:[
    ListActivityComponent,
    ActivityComponent
  ]
})
export class ActivityModule { }
