import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

const management = { roles: ['MANAGER', 'ADMIN'] };

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(module => module.AuthModule) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(module => module.ProfileModule) },
      { path: 'time-entry', loadChildren: () => import('./time-entry/time-entry.module').then(module => module.TimeEntryModule) },
      { path: 'tasks', canActivate: [RoleGuard], data: management,
        loadChildren: () => import('./task/task.module').then(module => module.TaskModule) },
      { path: 'projects', canActivate: [RoleGuard], data: management,
        loadChildren: () => import('./project/project.module').then(module => module.ProjectModule) },
      { path: 'clients', canActivate: [RoleGuard], data: management,
        loadChildren: () => import('./clients/clients.module').then(module => module.ClientsModule) },
      { path: 'users', canActivate: [RoleGuard], data: { roles: ['ADMIN'] },
        loadChildren: () => import('./users/users.module').then(module => module.UsersModule) },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
