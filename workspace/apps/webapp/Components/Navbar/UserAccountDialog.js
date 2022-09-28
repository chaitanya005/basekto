import { Avatar, Box, Button, Typography } from '@mui/material';
import DialogBox from '../Common/DialogBox';

const UserAccountDialog = ({ open, onClose, userAddress, disconnectWallet }) => {

    return (

        <DialogBox
            open={ open }
            title="Your Account"
            onClose={ onClose }
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
            >
                <Typography color="darkgray">
                    Connected with MetaMask
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={ disconnectWallet }
                    sx={{ px: 1, py: 0.25 }}
                >
                    Disconnect
                </Button>
            </Box>

            <Box display="flex" alignItems="center">
                <Avatar src="" alt="" sx={{ mr: 1 }} />

                <Typography fontSize="x-large">
                    { userAddress }
                </Typography>
            </Box>
        </DialogBox>
    );
};

export default UserAccountDialog;