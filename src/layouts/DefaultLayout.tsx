import { type PropsWithChildren } from 'react';
import { TaskProvider } from '../contexts/task-context';
import Header from '../components/Header/Header';
import { Container } from '@mui/material';
import AddTaskPopup from '../components/Popups/AddTaskPopup';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <TaskProvider>
      <Container>
        <Header />
        <div>{children}</div>
        <AddTaskPopup />
      </Container>
    </TaskProvider>
  );
};

export default DefaultLayout;
