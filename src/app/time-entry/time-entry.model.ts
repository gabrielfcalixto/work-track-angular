export interface TimeEntry{
  id?: number;
  taskId: number;
  userId: number;
  description?: string;
  entryDate: string;
  startTime: string;
  endTime: string;
  hoursLogged?: number;
  taskName?: string;  // Campo adicional para o nome da tarefa

}
