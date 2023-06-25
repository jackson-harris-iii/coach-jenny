import Spinner from '../components/Spinner';
import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Create = () => {
  const [courseDescription, setCourseDescription] = useState('');
  const [courseResponse, setCourseResponse] = useState<null | any>(null);
  const [weeks, setWeeks] = useState(4);
  const [hours, setHours] = useState(4);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreateCourse = async (event) => {
    event.preventDefault();
    console.log('here is the course description', courseDescription);
    try {
      setSubmitting(true);
      const res = await fetch('/api/create_course', {
        method: 'POST',
        body: JSON.stringify({
          content: courseDescription,
          hours,
          weeks,
        }),
      });
      const data = await res.json();
      console.log('here is the res', res.body);
      console.log(res);
      console.log('here is the data', data);
      setCourseResponse(data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  const createAnother = () => {
    setCourseResponse(null);
    setCourseDescription('');
    setWeeks(4);
    setHours(4);
  };
  if (submitting) {
    return <Spinner />;
  }

  if (courseResponse?.info?.content) {
    {
      console.log(courseResponse.info.content);
    }
    return (
      <>
        <Grid container justifyContent={'center'} marginY={4}>
          <Grid
            item
            xs={8}
            style={{ display: 'flex' }}
            justifyContent={'center'}
            marginBottom={4}
          >
            <Grid item xs={3} textAlign={'center'}>
              <Button variant="contained" onClick={handleOpen}>
                Create Another
              </Button>
            </Grid>
            <Grid item xs={3} textAlign={'center'}>
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Typography style={{ whiteSpace: 'pre-line' }}>
              {courseResponse.info.content}
            </Typography>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Did you save your course?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You will lose anything you have not saved.
            </Typography>
            <Grid container justifyContent="center" spacing={4} marginTop={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={createAnother}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleClose}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <Grid container justifyContent={'center'} marginY={4}>
      <Grid item xs={12} textAlign={'center'}>
        <h1 className="text-2xl text-center">Make a course</h1>
      </Grid>

      <Grid item xs={12} md={6}>
        <div>
          <div>
            <p>Tell me a little about what you'd like to learn.</p>
            <TextField
              fullWidth
              variant="standard"
              placeholder="I want to learn about wine making..."
              type="text"
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>

          <div>
            <p>How many weeks do you want to spend on this?</p>
            <Slider
              min={1}
              max={6}
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
            />
            {weeks} weeks
          </div>

          <div>
            <p>How many hours per week do you want to spend on this?</p>
            <Slider
              min={1}
              max={10}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            {hours} hours / week
          </div>

          <div style={{ marginTop: '1em' }}>
            <Button
              type="submit"
              onClick={handleCreateCourse}
              variant="contained"
            >
              Create Course
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Create;
