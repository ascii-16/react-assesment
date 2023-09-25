import { type PropsWithChildren } from 'react';
import { TaskProvider } from '../contexts/task-context';
import Header from '../components/Header/Header';
import { Container } from '@mui/material';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <TaskProvider>
      <Container>
        <Header />
        <div>{children}</div>
      </Container>
    </TaskProvider>
  );
};

export default DefaultLayout;
