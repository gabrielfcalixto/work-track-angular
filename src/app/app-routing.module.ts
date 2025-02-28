import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protegido
      { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] }, // Protegido
      { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] }, // Protegido
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protegido
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, // Protegido
      { path: 'time-entry', component: TimeEntryComponent, canActivate: [AuthGuard] }, // Protegido
      { path: '**', component: NotFoundComponent } // 404 dentro do Layout
    ],
  },
  { path: '**', component: NotFoundComponent } // 404 global
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
