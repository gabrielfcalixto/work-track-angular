export interface TimeEntryRequest {
  taskId?: number;
  description: string;
  entryDate: string;
  startTime: string;
  endTime: string;
}

export interface TimeEntry extends TimeEntryRequest {
  id: number;
  taskId: number;
  taskName: string;
  userId: number;
  hoursLogged: number;
}
