export interface Role {
  name: string;
  value: string;
}

export interface Users {
  id?: number;
  name: string;
  login: string;
  email: string;
  role: Role | string;  // O role pode ser tanto um objeto 'Role' ou uma string
}
