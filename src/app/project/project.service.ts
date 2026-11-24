import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Project, ProjectRequest } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly url = `${environment.apiUrl}/project`;

  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Project[]>(this.url);
  }

  save(request: ProjectRequest, id?: number) {
    return id === undefined
      ? this.http.post<Project>(this.url, request)
      : this.http.put<Project>(`${this.url}/${id}`, request);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
