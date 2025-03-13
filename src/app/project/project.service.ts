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
    return this.http.post<Project>(`${this.apiUrl}/add`, project);

  }

  editProject(project: Project) {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);

  }


    updateStatus(projectId: number, statusUpdate: { status: string }): Observable<Project> {
      return this.http.patch<Project>(`${this.apiUrl}/update-status/${projectId}`, statusUpdate);
    }


  deleteProject(projectId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }
}
