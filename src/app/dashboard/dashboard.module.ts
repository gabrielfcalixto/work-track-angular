import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard.component';
import { WeeklyHoursComponent } from './weekly-hours.component';

@NgModule({
  declarations: [DashboardComponent, WeeklyHoursComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])]
})
export class DashboardModule {}
