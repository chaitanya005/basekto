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

const CreatePublicUrlDialog = ({
  isOpen,
  userAddress,
  onCreation,
}) => {
  const mutation = useMutation((publicUrl) => {
    return axios.put(
				`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userAddress}`,
				{ publicUrl }
			);
  });

	const [publicUrl, setPublicUrl] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(publicUrl);
  };

  useEffect(() => {

    if (mutation.isError) {

      if (mutation.error.response.status === 400) {
        setError('Public URL already exists!');
      } else {
        setError('Something went wrong');
      }
    } else if (mutation.data?.data.success) {
      onCreation();
    }
  }, [mutation.status]);

  return (
    <Dialog maxWidth="sm" open={isOpen}>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Typography variant="h5" component="div" textAlign="center">
            Add Public URL
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
                    basketofinance.com/
                  </InputAdornment>
                ),
                sx: { mb: 1 },
              }}
              value={publicUrl}
              onChange={(e) => setPublicUrl(e.target.value)}
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
            {mutation.isLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePublicUrlDialog;