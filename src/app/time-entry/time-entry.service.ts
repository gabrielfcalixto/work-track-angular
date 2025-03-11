import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from './time-entry.model';

@Injectable({ providedIn: 'root' })
export class TimeEntryService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Método para buscar as tarefas do usuário
  getTasksByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/task/usertask/${userId}`);
  }

  getUserTimeEntries(userId: number): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/time-entries/user/${userId}`);
  }

  saveTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries/add`, entry);
  }



}
