import { type Tasks } from '../types/task.type';
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_TASKS: Tasks = [
  {
    id: uuidv4(),
    name: 'Meeting',
    description:
      'Fusce turpis dui, faucibus maximus nulla id, consequat semper erat',
    deadline: new Date(),
  },
  {
    id: uuidv4(),
    name: 'What is Lorem Ipsum',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    deadline: new Date(),
  },
];
