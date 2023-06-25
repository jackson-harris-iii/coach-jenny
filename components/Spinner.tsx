import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => (
  <Grid container>
    <Grid item xs={12} textAlign={'center'} marginTop={'5em'}>
      <CircularProgress />
    </Grid>
  </Grid>
);
export default Spinner;
