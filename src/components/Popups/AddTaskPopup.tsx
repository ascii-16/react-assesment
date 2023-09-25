import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskArgs } from '../../types/task.type';
import { useTaskContext } from '../../contexts/TaskContext';

const AddTaskPopup = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<CreateTaskArgs>({
    defaultValues: { name: '', description: '' },
  });
  const { addTask } = useTaskContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<CreateTaskArgs> = (data) => {
    addTask({ ...data, id: uuidv4() });
    handleClose();
  };

  return (
    <div>
      <Fab
        style={{ position: 'fixed', right: '10px', bottom: '10px' }}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  style={{ marginBottom: '20px' }}
                  {...field}
                />
              )}
            />
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  className="date-picker"
                  label="Deadline"
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTaskPopup;
