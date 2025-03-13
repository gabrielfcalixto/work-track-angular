export interface Task {
  id?: number;
  name: string;
  description: string;
  estimatedHours: number;
  status: string;
  priority: string;
  totalHours: number;
  projectId?: number;
  assignedUserIds: number[];
  startDate: string;
  deadline: string;
}
