import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CreateAccountDialog = ({
  isOpen,
  userAddress,
  onAccountCreation,
}) => {
  const mutation = useMutation((accountDetails) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/new`,
      accountDetails
    );
  });

  const [accountDetails, setAccountDetails] = useState({
    userAddress: userAddress,
    firstName: '',
    lastName: '',
    email: '',
    publicUrl: '',
  });
  const [error, setError] = useState('');

  const onChange = (e, key) => {
    setAccountDetails({
      ...accountDetails,
      [key]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(accountDetails);
  };

  useEffect(() => {

    if (mutation.isError) {
      if (mutation.error.response.status === 400) {
        setError('Public URL already exists!');
      } else {
        setError('Account creation failed!');
      }
    }else if (mutation.data?.status == 200) {
      onAccountCreation();
    }
  }, [mutation.status]);

  return (
    <Dialog maxWidth="sm" open={isOpen}>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Typography variant="h5" component="div" textAlign="center">
            Create New Account
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ maxWidth: '420px' }}>
          {(mutation.error ||
            (mutation.data && mutation.data.status != 200)) && (
            <Typography
              variant="body2"
              align="center"
              color="error"
              sx={{ mb: 2 }}
              onClick={() => mutation.reset()}
            >
              { error }
            </Typography>
          )}

          <Paper elevation={0} sx={{ background: 'transparent' }}>
            <TextField
              fullWidth
              variant="standard"
              label="First Name"
              value={accountDetails.firstName}
              onChange={(e) => onChange(e, 'firstName')}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              variant="standard"
              label="Last Name"
              value={accountDetails.lastName}
              onChange={(e) => onChange(e, 'lastName')}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              variant="standard"
              label="Email"
              type="email"
              value={accountDetails.email}
              onChange={(e) => onChange(e, 'email')}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              variant="standard"
              label="Public URL"
              inputProps={{
                pattern: '[\\w|-]{3,10}'
              }}
              helperText={
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1rem',
                  }}
                >
                  <li>
                    Should be of 3-10 characters in length
                  </li>
                  <li>
                    No special characters other than hyphens and underscores are allowed
                  </li>
                </ul>
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    basketofinance.com/user/
                  </InputAdornment>
                ),
                sx: { mb: 1 },
              }}
              value={accountDetails.publicUrl}
              onChange={(e) => onChange(e, 'publicUrl')}
              required
            />
          </Paper>
        </DialogContent>

        <DialogActions sx={{ p: '0 1.5rem 2rem' }}>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateAccountDialog;
