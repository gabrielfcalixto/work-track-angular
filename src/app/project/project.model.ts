export interface Project {
  id?: number;
  name: string;
  description: string;
  hours: number;  // tipo correto para horas (pode ser decimal)
  status: string;
  managerId?: number;  // refere-se ao ID do gerente
  clientId?: number;   // refere-se ao ID do cliente
  teamMemberIds: number[];  // lista de IDs de membros da equipe
  startDate: string;
  deadline: string;
}
