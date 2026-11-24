import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { apiError } from '../shared/api-error';
import { DashboardService, WeeklyHoursSummary } from './dashboard.service';

@Component({
  selector: 'app-weekly-hours',
  templateUrl: './weekly-hours.component.html',
  styleUrls: ['./weekly-hours.component.scss']
})
export class WeeklyHoursComponent {
  @Input({ required: true }) week!: WeeklyHoursSummary;
  @Output() goalSaved = new EventEmitter<number>();

  readonly form = new FormGroup({
    hours: new FormControl<number | null>(null, [
      Validators.required, Validators.min(1), Validators.max(168), Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)
    ])
  });
  editingGoal = false;
  saving = false;
  saved = false;
  error = '';

  constructor(private readonly dashboard: DashboardService) {}

  get peakHours(): number {
    return Math.max(1, ...this.week.days.map(day => day.hours));
  }

  get remainingHours(): number {
    return Math.max(0, Math.round((this.week.goalHours - this.week.totalHours) * 100) / 100);
  }

  get percentage(): number {
    return this.remainingHours === 0 ? 100 : Math.min(99, Math.round(100 * this.week.totalHours / this.week.goalHours));
  }

  editGoal(): void {
    this.form.reset({ hours: this.week.goalHours });
    this.saved = false;
    this.error = '';
    this.editingGoal = true;
  }

  saveGoal(): void {
    const { hours } = this.form.getRawValue();
    if (this.saving || this.form.invalid || hours === null) return;

    this.saving = true;
    this.error = '';
    this.dashboard.saveWeeklyGoal(hours).pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.goalSaved.emit(hours);
        this.editingGoal = false;
        this.saved = true;
      },
      error: error => this.error = apiError(error, 'Não foi possível salvar a meta.')
    });
  }
}
