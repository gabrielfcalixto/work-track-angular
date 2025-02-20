export interface TimeEntry{
  id?: number;
  taskId: number;
  entryDate: string;
  startTime: string;
  endTime: string;
  totalHours?: number;
}
