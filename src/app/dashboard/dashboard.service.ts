import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  // ✅ Busca os dados gerais do dashboard com base no usuário autenticado
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // ✅ Busca as horas totais de um usuário
  getUserHours(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-hours/${userId}`);
  }

  // ✅ Busca as horas totais lançadas no mês atual por um usuário
  getTotalHoursMonth(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-hours-month/${userId}`);
  }

  // ✅ Busca a quantidade de tarefas pendentes de um usuário
  getPendingTasksCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tasks/pending/${userId}`);
  }

  // ✅ Busca a quantidade de tarefas concluídas de um usuário
  getCompletedTasksCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tasks/completed/${userId}`);
  }

  // ✅ Busca a quantidade de tarefas em andamento de um usuário
  getOngoingTasksCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tasks/ongoing/${userId}`);
  }

  getTaskDistribution(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/distribution/${userId}`);
  }

}
