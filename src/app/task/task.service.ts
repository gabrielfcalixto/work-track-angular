import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/task';

  constructor(private http: HttpClient){}
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`/${taskId}`);
  }


  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/add`, task);

  }

  editTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);

  }

  updateStatus(taskId: number, statusUpdate: { status: string }): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/update-status/${taskId}`, statusUpdate);
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
