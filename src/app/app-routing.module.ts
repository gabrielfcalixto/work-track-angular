import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ReportComponent } from './report/report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent, //Aplica o Layout para todas outras páginas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {path: 'tasks', component: TaskComponent},
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/add', component: AddProjectComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },

    ]
  },
  {path: '**', component:NotFoundComponent} //Rota coringa para evitar erros 404

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
