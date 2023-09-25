import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { CreateTaskArgs, Task } from '../../types/task.type';
import { useTaskContext } from '../../contexts/TaskContext';

interface Props {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskPopup = ({ task, isOpen, onClose }: Props) => {
  const [open, setOpen] = useState(isOpen);
  const { handleSubmit, control, reset, setValue } = useForm<CreateTaskArgs>();
  const { editTask } = useTaskContext();

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('deadline', task.deadline);
    }
  }, [task]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    reset();
    setOpen(false);
    onClose();
  };

  const onSubmit: SubmitHandler<CreateTaskArgs> = (data) => {
    editTask(task.id, { ...data });
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
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
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTaskPopup;
