import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { switchToMaticMainnet, switchToTestNetwork } from '@basketo/web-utils';
import DialogBox from '../DialogBox';
import RequestingPopup from './RequestingPopup';

const SwitchNetworkPopup = ({ isOpen, onClose, onComplete }) => {
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');

  const onClick = () => {
    setError('');
    setRequesting(true);

    process.env.NODE_ENV === 'production'
      ? switchToMaticMainnet()
      : switchToTestNetwork()
          .then(() => {
            setError('');
            onComplete();
          })
          .catch((err) => {
            if (err.code === -32002) {
              setError(
                'Something went wrong! A request to switch network may already be ongoing, please check, or try again'
              );
            }
          })
          .finally(() => setRequesting(false));
  };

  return (
    <>
      <RequestingPopup isOpen={requesting} />

      <DialogBox
        title="Invalid Network"
        open={isOpen}
        onClose={onClose}
        dividers
      >
        <Typography marginBottom={2}>
          In order to continue, {"you'll"} need to switch to the Polygon{' '}
          {'(Mumbai)'} network
        </Typography>

        <Typography
          color="error"
          fontSize="small"
          textAlign="center"
          marginBottom={1.5}
        >
          {error}
        </Typography>

        <Button color="primary" variant="contained" onClick={onClick} fullWidth>
          Switch to Polygon {'(Mumbai)'}
        </Button>
      </DialogBox>
    </>
  );
};

export default SwitchNetworkPopup;
