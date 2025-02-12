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
import { ActivityModule } from './activity/activity.module';
import { ActivityService } from './activity/activity.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UsersComponent,
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
    ActivityModule,
    TableModule,
    FormsModule
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
