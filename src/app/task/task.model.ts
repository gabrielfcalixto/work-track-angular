export interface Task {
  id?: number;
  name: string;
  description: string;
  estimatedHours: number;
  totalHours: number;
  status: string;
}
