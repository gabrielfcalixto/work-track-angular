import { Project } from './../project/project.model';
export interface Task {
  id?: number;
  name: string;
  description: string;
  estimatedHours: number;
  totalHours: number;
  status: string;
  projectId?: number;
}
