import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertBox = ({ alert, setAlert }) => {
  return (
    <Snackbar
      onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
      open={alert.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={alert?.severity} variant="filled" sx={{ width: '100%' }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBox;
