import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import DialogBox from '../DialogBox';

const RequestingPopup = ({ isOpen, onClose }) => {

    return (

        <DialogBox
            title={
                <Typography
                    variant="h6"
                    textAlign="center"
                >
                    Requesting Wallet
                </Typography>
            }
            open={ isOpen }
            onClose={ onClose }
            dividers
        >
            <Box textAlign="center">
                <CircularProgress
                    size="5rem"
                    sx={{ mt: 1, mb: 3 }}
                />
            </Box>

            <Typography textAlign="center">
                Waiting for your confirmation
            </Typography>
        </DialogBox>
    );
}

export default RequestingPopup;