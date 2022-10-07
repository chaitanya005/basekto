import { Avatar, Box, Button, Typography } from '@mui/material';
import DialogBox from '../Common/DialogBox';

const UserAccountDialog = ({ open, onClose, userAddress, disconnectWallet, changeAccount }) => {

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
                gap={ 1.5 }
                sx={{ mb: 1 }}
            >
                <Typography color="darkgray" fontSize="small">
                    Connected with MetaMask
                </Typography>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    gap={ 1.5 }
                >
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ disconnectWallet }
                        sx={{ px: 1, py: 0.25 }}
                    >
                        Disconnect
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ changeAccount }
                        sx={{ px: 1, py: 0.25 }}
                    >
                        Change
                    </Button>
                </Box>
            </Box>

            <Box display="flex" alignItems="center">
                <Avatar src="" alt="" sx={{ mr: 1.5 }} />

                <Typography fontSize="1.25rem">
                    { userAddress }
                </Typography>
            </Box>
        </DialogBox>
    );
};

export default UserAccountDialog;