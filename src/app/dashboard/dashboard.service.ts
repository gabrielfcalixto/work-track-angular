import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export const taskStatuses = {
  NAO_INICIADA: 'Não iniciadas',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluídas',
  EM_ESPERA: 'Em espera',
  CANCELADA: 'Canceladas'
};

export interface WeeklyHoursSummary {
  weekStart: string;
  weekEnd: string;
  days: { date: string; hours: number }[];
  totalHours: number;
  goalHours: number;
}

export interface DashboardSummary {
  totalHoursWorked: number;
  totalHoursMonth: number;
  weeklyHours: WeeklyHoursSummary;
  pendingTasksCount: number;
  completedTasksCount: number;
  tasksInProgress: number;
  projectsManaged: number;
  tasksCreated: number;
  totalUsers: number | null;
  totalProjects: number | null;
  totalTasks: number | null;
  taskDistribution: Record<keyof typeof taskStatuses, number>;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getSummary() {
    return this.http.get<DashboardSummary>(`${environment.apiUrl}/dashboard`);
  }

  saveWeeklyGoal(hours: number) {
    return this.http.put<void>(`${environment.apiUrl}/dashboard/weekly-goal`, { hours });
  }
}
