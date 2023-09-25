import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TaskContextType } from '../../../contexts/TaskContext';
import AddTaskPopup from '../AddTaskPopup';
import { createContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const mockAddTask = jest.fn();

jest.mock('../../../contexts/TaskContext', () => ({
  useTaskContext: () => ({
    addTask: mockAddTask,
  }),
}));

test('renders AddTaskPopup and adds a task', async () => {
  const TaskContext = createContext<TaskContextType | null>(null);

  const { getByLabelText, getByText, queryByText } = render(
    // @ts-ignore
    <TaskContext.Provider value={{ tasks: [], addTask: mockAddTask }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AddTaskPopup />
      </LocalizationProvider>
    </TaskContext.Provider>
  );

  fireEvent.click(getByLabelText('add'));

  fireEvent.change(getByLabelText('Name'), { target: { value: 'Test Task' } });
  fireEvent.change(getByLabelText('Description'), {
    target: { value: 'Task description' },
  });

  fireEvent.click(getByText('Add'));

  await waitFor(() => {
    const element = queryByText('Add Task');
    expect(element).toBeNull();
  });

  expect(mockAddTask).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Test Task',
      description: 'Task description',
    })
  );
});
