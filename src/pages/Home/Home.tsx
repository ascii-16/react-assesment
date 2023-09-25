import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useTaskContext } from '../../contexts/task-context';
import { Delete, Edit } from '@mui/icons-material';
import { type Task } from '../../types/task.type';
import EditTaskPopup from '../../components/Popups/EditTaskPopup';

const GridCard = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const { deleteTask } = useTaskContext();
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography component="div" variant="subtitle1" fontWeight={'bold'}>
            {task.name}
          </Typography>
          <Typography variant="inherit" color="text.secondary" component="div">
            {task.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton
            aria-label="previous"
            onClick={() => setOpen((open) => !open)}
          >
            <Edit />
          </IconButton>
          <IconButton aria-label="previous" onClick={() => deleteTask(task.id)}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <EditTaskPopup
        isOpen={open}
        task={task}
        onClose={() => setOpen((open) => !open)}
      />
    </Card>
  );
};

const Home = () => {
  const { tasks } = useTaskContext();
  return (
    <Grid container spacing={4}>
      {tasks.map((task) => (
        <Grid key={task.id} item xs={6}>
          <GridCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
