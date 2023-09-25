export interface Task {
  id: string;
  name: string;
  description?: string;
  deadline?: Date;
}

export type CreateTaskArgs = Pick<Task, 'name' | 'description' | 'deadline'>;

export type Tasks = Task[];
