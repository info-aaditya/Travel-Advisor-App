import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    padding: '25px',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
  },

  list: {
    height: '75vh',
    overflow: 'auto',
  },

  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
}));