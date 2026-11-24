import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { apiError } from '../shared/api-error';
import { Task } from '../task/task.model';
import { TimeEntry } from '../time-entry/time-entry.model';
import { TimeEntryService } from '../time-entry/time-entry.service';
import { DashboardService, DashboardSummary, taskStatuses } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly user = this.auth.getLoggedUser();
  summary?: DashboardSummary;
  recent: TimeEntry[] = [];
  upcoming: Task[] = [];
  distribution: { label: string; count: number }[] = [];
  taskCount = 0;
  loading = false;
  error = '';

  constructor(
    private readonly dashboard: DashboardService,
    private readonly timeEntries: TimeEntryService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    forkJoin({
      summary: this.dashboard.getSummary(),
      entries: this.timeEntries.listMine(),
      tasks: this.timeEntries.listMyTasks()
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ summary, entries, tasks }) => {
        this.summary = summary;
        this.recent = entries.slice(0, 5);
        this.upcoming = tasks
          .filter(task => !['CONCLUIDA', 'CANCELADA'].includes(task.status))
          .sort((left, right) => left.deadline.localeCompare(right.deadline))
          .slice(0, 5);
        this.distribution = Object.entries(summary.taskDistribution).map(([status, count]) => ({
          label: taskStatuses[status as keyof typeof taskStatuses],
          count
        }));
        this.taskCount = this.distribution.reduce((total, status) => total + status.count, 0);
      },
      error: error => this.error = apiError(error, 'Não foi possível carregar a visão geral.')
    });
  }
}
