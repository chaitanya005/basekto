import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

const BasicModal = ({ open, setOpen }) => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setStep(1);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {step == 1 ? (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ m: 2, textAlign: 'center', mt: 0 }}
            >
              Invest USDT
            </Typography>

            <Grid
              display="flex"
              justifyContent={'space-between'}
              padding={'1.5rem 0.5rem'}
              sx={{ backgroundColor: '#F4F5F6', borderRadius: '5px', mt: 2 }}
            >
              <Typography variant="p">Available Balance</Typography>
              <Typography variant="p">$10.45</Typography>
            </Grid>
            <TextField
              fullWidth
              id="standard-basic fullwidth"
              label="Amount to Invest"
              variant="standard"
              sx={{ mt: 3 }}
              required
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              onClick={() => setStep(2)}
              type="submit"
            >
              Invest
            </Button>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              sx={{ m: 2, textAlign: 'center', mt: 0 }}
            >
              Yay! 🎉
            </Typography>

            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              Congrats! You have successfully invested through Basketo
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default BasicModal;
