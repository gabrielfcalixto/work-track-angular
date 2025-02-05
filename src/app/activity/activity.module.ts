import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ListActivityComponent,
    AddActivityComponent,
    EditActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  exports:[
    ListActivityComponent
  ]
})
export class ActivityModule { }
