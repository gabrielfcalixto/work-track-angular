import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './login/login.module';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { TimeEntryModule } from './time-entry/time-entry.module';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { AvatarComponent } from './shared/avatar/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UsersComponent,
    TaskComponent,
    ProjectComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    PrimeNGModule,
    LayoutModule,
    RouterModule, // Mantido apenas uma vez
    ProjectModule,
    TableModule,
    FormsModule,
    TaskModule,
    TimeEntryModule,
    ReactiveFormsModule,
    ProfileModule,
    ProgressSpinnerModule,
    ChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
