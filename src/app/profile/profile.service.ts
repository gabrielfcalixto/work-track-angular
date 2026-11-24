import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  getProfile() {
    return this.http.get<Profile>(`${environment.apiUrl}/profile/me`);
  }
}
