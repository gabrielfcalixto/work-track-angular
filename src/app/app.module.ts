import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { TimeEntryModule } from './time-entry/time-entry.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UsersComponent,
    TaskComponent,
    ProjectComponent,
    TimeEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    DashboardModule, // Importa o DashboardModule para acessar o DashboardComponent
    PrimeNGModule,  // Se esse for um módulo compartilhado do PrimeNG, mantenha ele aqui para uso global
    LayoutModule,
    RouterModule,
    ProfileModule,
    RouterModule,
    ProjectModule,
    TableModule,
    FormsModule,
    TaskModule,
    ProjectModule,
    TimeEntryModule,
    ReactiveFormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
