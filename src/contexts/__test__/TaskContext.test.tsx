import { act } from 'react-dom/test-utils'; // Import act for testing asynchronous code if needed
import { renderHook } from '@testing-library/react-hooks';
import { TaskProvider, useTaskContext } from '../TaskContext';
import { Task } from '../../types/task.type';

test('addTask - adds a task to the context', () => {
  const { result } = renderHook(() => useTaskContext(), {
    wrapper: TaskProvider,
  });

  act(() => {
    result.current.addTask({
      name: 'Test',
      description: 'test task',
    });
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].name).toBe('Test');
  expect(result.current.tasks[0].description).toBe('test task');
});

test('editTask - edits a task from the context', () => {
  const { result } = renderHook(() => useTaskContext(), {
    wrapper: TaskProvider,
  });

  act(() => {
    result.current.addTask({
      name: 'Test',
      description: 'test task',
    });
  });

  const taskId = result.current.tasks[0].id;

  act(() => {
    result.current.editTask(taskId, {
      name: 'Edit Test',
      description: 'test task edited',
    });
  });

  expect(result.current.tasks[0].name).toBe('Edit Test');
  expect(result.current.tasks[0].description).toBe('test task edited');
});

test('deleteTask - deletes a task from the context', () => {
  const { result } = renderHook(() => useTaskContext(), {
    wrapper: TaskProvider,
  });

  act(() => {
    result.current.addTask({
      name: 'Test',
      description: 'test task',
    });
  });

  const taskId = result.current.tasks[0].id;

  act(() => {
    result.current.deleteTask(taskId);
  });

  expect(result.current.tasks).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining<Task>({
        id: taskId,
        name: 'Test',
        description: 'test task',
      }),
    ])
  );
});

test('getTask - gets a single task from the context', () => {
  const { result } = renderHook(() => useTaskContext(), {
    wrapper: TaskProvider,
  });

  act(() => {
    result.current.addTask({
      name: 'Test',
      description: 'test task',
    });
  });

  const task = result.current.tasks[0];
  const getTaskResult = result.current.getTask(task.id);

  expect(getTaskResult?.name).toBe('Test');
  expect(getTaskResult?.description).toBe('test task');
});
