import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const CreateAccountDialog = ({
  isOpen,
  onClose,
  userAddress,
  onAccountCreation,
}) => {
  const mutation = useMutation((accountDetails) => {
    return fetch('https://basketo-api.herokuapp.com/api/user/new', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(accountDetails),
    });
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
    if (mutation.data?.ok) {
      onAccountCreation();
    }
  }, [mutation.data]);

  return (
    <Dialog maxWidth="sm" open={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Typography variant="h5" component="div">
            Create New Account
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ maxWidth: '420px' }}>
          {(mutation.error || (mutation.data && !mutation.data.ok)) && (
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
