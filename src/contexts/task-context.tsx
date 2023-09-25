import { type PropsWithChildren, createContext } from 'react';
import { type Task, type Tasks } from '../types/task.type';
import { useLocalStorage } from 'usehooks-ts';

export type TaskContextType = {};

export const TaskContext = createContext<TaskContextType | null>(null);

export type TaskProviderProps = {};

export const TaskProvider = ({
  children,
}: PropsWithChildren<TaskProviderProps>) => {
  const [tasks, setTasks] = useLocalStorage<Tasks>('tasks', []);

  const addTask = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const editTask = (id: string, data: Task) => {
    setTasks((tasks) => tasks.map((task) => (task.id === id ? data : task)));
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
