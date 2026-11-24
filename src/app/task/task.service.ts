import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task, TaskRequest } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly url = `${environment.apiUrl}/task`;

  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Task[]>(this.url);
  }

  save(request: TaskRequest, id?: number) {
    return id === undefined
      ? this.http.post<Task>(this.url, request)
      : this.http.put<Task>(`${this.url}/${id}`, request);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
