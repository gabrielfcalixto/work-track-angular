export const taskStatusLabels = {
  NAO_INICIADA: 'Não iniciada',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
  EM_ESPERA: 'Em espera',
  CANCELADA: 'Cancelada'
};

export const taskPriorityLabels = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' };

export type TaskStatus = keyof typeof taskStatusLabels;
export type TaskPriority = keyof typeof taskPriorityLabels;

export interface TaskRequest {
  name: string;
  description: string;
  estimatedHours: number;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: number;
  assignedUserIds: number[];
  startDate: string;
  deadline: string;
}

export interface Task extends TaskRequest {
  id: number;
  totalHours: number;
}
