import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient){}
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);

  }

  editProject(project: Project) {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);

  }

  updateStatus(project: Project) {
    return this.http.patch<Project>(`${this.apiUrl}/${project.id}/status`, { role: project.status });

  }

  deleteProject(projectId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }
}
