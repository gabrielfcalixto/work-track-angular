import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent, //Aplica o Layout para todas outras páginas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {path: 'tasks', component: TaskComponent},
      { path: 'projects', component: ProjectComponent },
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
