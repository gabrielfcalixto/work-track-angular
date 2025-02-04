import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { AddProjectComponent } from './project/projects/add-project/add-project.component';
import { EditProjectComponent } from './project/projects/edit-project/edit-project.component';
import { ReportComponent } from './report/report/report.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent, //Aplica o Layout para todas outras páginas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/add', component: AddProjectComponent },
      { path: 'projects/edit/:id', component: EditProjectComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: EditProfileComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }

    ]
  },
  {path: '**', component:NotFoundComponent} //Rota coringa para evitar erros 404

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
