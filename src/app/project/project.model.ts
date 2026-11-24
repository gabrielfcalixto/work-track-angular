export const projectStatuses = {
  NAO_INICIADO: 'Não iniciado',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
  EM_ESPERA: 'Em espera',
  CANCELADO: 'Cancelado'
};

export type ProjectStatus = keyof typeof projectStatuses;

export interface ProjectRequest {
  name: string;
  description: string;
  hours: number;
  status: ProjectStatus;
  managerId: number;
  clientId: number;
  teamMemberIds: number[];
  startDate: string;
  deadline: string;
}

export interface Project extends ProjectRequest {
  id: number;
}
