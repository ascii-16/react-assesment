import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { TaskContextType } from '../../../contexts/TaskContext';
import EditTaskPopup from '../EditTaskPopup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createContext } from 'react';

const mockEditTask = jest.fn();

jest.mock('../../../contexts/TaskContext', () => ({
  useTaskContext: () => ({
    editTask: mockEditTask,
  }),
}));

test('renders EditTaskPopup and edits a task', async () => {
  const TaskContext = createContext<TaskContextType | null>(null);
  const taskId = uuidv4();
  const task = {
    id: taskId,
    name: 'Original Task',
    description: 'Task description',
  };

  const { getByLabelText, getByText, queryByText } = render(
    // @ts-ignore
    <TaskContext.Provider value={{ tasks: [], editTask: mockEditTask }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EditTaskPopup task={task} isOpen onClose={() => {}} />
      </LocalizationProvider>
    </TaskContext.Provider>
  );

  fireEvent.change(getByLabelText('Name'), {
    target: { value: 'Updated Task' },
  });
  fireEvent.change(getByLabelText('Description'), {
    target: { value: 'Updated description' },
  });

  fireEvent.click(getByText('Edit'));

  await waitFor(() => {
    const element = queryByText('Edit Task');
    expect(element).toBeNull();
  });

  expect(mockEditTask).toHaveBeenCalledWith(
    taskId,
    expect.objectContaining({
      name: 'Updated Task',
      description: 'Updated description',
    })
  );
});
