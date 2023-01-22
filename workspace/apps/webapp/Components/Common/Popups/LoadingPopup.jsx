import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import DialogBox from '../DialogBox';

const LoadingPopup = ({ isOpen, onClose, title, text }) => {

    return (

        <DialogBox
            title={
                <Typography
                    variant="h6"
                    textAlign="center"
                >
                    { title }
                </Typography>
            }
            open={ isOpen }
            onClose={ onClose }
            dividers={ !!text }
        >
            <Box textAlign="center">
                <CircularProgress
                    size="5rem"
                    sx={{ mt: 1, mb: 3 }}
                />
            </Box>

            <Typography textAlign="center">
                { text }
            </Typography>
        </DialogBox>
    );
}

export default LoadingPopup;