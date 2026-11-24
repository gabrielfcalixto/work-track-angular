import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ClientRequest {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cnpj: string | null;
  razaoSocial: string | null;
  address: string | null;
}

export interface Client extends ClientRequest {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private readonly url = `${environment.apiUrl}/clients`;

  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Client[]>(this.url);
  }

  save(client: ClientRequest, id?: number) {
    return id === undefined
      ? this.http.post<Client>(this.url, client)
      : this.http.put<Client>(`${this.url}/${id}`, client);
  }
}
