import { type PropsWithChildren, createContext, useContext } from 'react';
import { CreateTaskArgs, type Task, type Tasks } from '../types/task.type';
import { useLocalStorage } from 'usehooks-ts';

export type TaskContextType = {
  tasks: Tasks;
  addTask: (task: Task) => void;
  editTask: (id: string, data: CreateTaskArgs) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export type TaskProviderProps = {};

export const TaskProvider = ({
  children,
}: PropsWithChildren<TaskProviderProps>) => {
  const [tasks, setTasks] = useLocalStorage<Tasks>('tasks', []);

  const addTask = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const editTask = (id: string, data: CreateTaskArgs) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const getTask = (id: string): Task | undefined => {
    const task = tasks.find((task) => task.id === id);
    return task;
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, getTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('TaskContext must be used inside the TaskProvider');
  }

  return context;
};
