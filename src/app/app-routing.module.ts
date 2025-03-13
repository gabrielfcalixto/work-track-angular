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
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protege todo o layout
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskComponent, canActivate: [RoleGuard], data: { roles: ['USER', 'MANAGER'] } },
      { path: 'projects', component: ProjectComponent, canActivate: [RoleGuard], data: { roles: ['MANAGER', 'ADMIN'] } },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
      { path: 'time-entry', component: TimeEntryComponent, canActivate: [RoleGuard], data: { roles: ['USER', 'MANAGER'] } },
      { path: '**', component: NotFoundComponent } // Protegido também
    ],
  },
  { path: '**', redirectTo: '/login' } // Redireciona para login se não autenticado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
