import { NgModule } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    TaskComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,


  ],
  providers: [MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
  exports:[
  ]
})
export class TaskModule { }
