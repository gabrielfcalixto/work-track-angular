import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost/api/dashboard';

  constructor(private http: HttpClient) {}

  getUserHours(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-hours/${userId}`);
  }

  getManagerStats(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/manager-stats/${userId}`);
  }

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin-stats`);
  }
}
