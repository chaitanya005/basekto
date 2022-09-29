import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

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
  });

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
    if (mutation.data?.status == 200) {
      onAccountCreation();
    }
  }, [mutation.data]);

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
              Account creation failed!
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
