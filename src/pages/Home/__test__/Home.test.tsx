import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import { render } from '@testing-library/react';
import { TaskContext } from '../../../contexts/TaskContext';
import { Tasks } from '../../../types/task.type';
import Home from '../Home';

test('renders a list of tasks', () => {
  const testTasks = [
    { id: uuidv4(), name: 'Task 1' },
    { id: uuidv4(), name: 'Task 2' },
    { id: uuidv4(), name: 'Task 3' },
  ] satisfies Tasks;

  const { getByText } = render(
    // @ts-ignore
    <TaskContext.Provider value={{ tasks: testTasks }}>
      <Home />
    </TaskContext.Provider>
  );

  testTasks.forEach((task) => {
    const taskElement = getByText(task.name);
    expect(taskElement).toBeInTheDocument();
  });
});
