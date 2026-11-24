import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from '../task/task.model';
import { TimeEntry, TimeEntryRequest } from './time-entry.model';

@Injectable({ providedIn: 'root' })
export class TimeEntryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listMyTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}/task/me`);
  }

  listMine() {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/time-entries/me`);
  }

  create(entry: TimeEntryRequest) {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries`, entry);
  }

  update(id: number, entry: TimeEntryRequest) {
    return this.http.put<TimeEntry>(`${this.apiUrl}/time-entries/${id}`, entry);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/time-entries/${id}`);
  }
}
