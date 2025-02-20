import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from './time-entry.model';

@Injectable({ providedIn: 'root' })
export class TimeEntryService {
  private apiUrl = 'http://localhost:8080/time-entries';

  constructor(private http: HttpClient) {}

  getUserTimeEntries(userId: number): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/user/${userId}`);
  }

  saveTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(this.apiUrl, entry);
  }
}
