import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { getBalance, getNetwork } from '@basketo/web-utils';
import DialogBox from '../Common/DialogBox';
import Link from 'next/link';

const UserAccountDialog = ({ open, onClose, userAddress, disconnectWallet, changeAccount }) => {

    const [balance, setBalance] = useState(0);
    const currency = '???';

    useEffect(() => {
        getBalance().then(setBalance);
    }, [userAddress]);

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
            >

                <Box display="flex" alignItems="center">
                    <Avatar
                        src="" alt=""
                        sx={{
                            mr: { xs: 1, sm: 1.5 },
                            width: { xs: '1.5rem', sm: '2rem' },
                            height: { xs: '1.5rem', sm: '2rem' },
                        }}
                    />

                    <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }}}>
                        { userAddress }
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ gap: { xs: 1, sm: 1.5 }}}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ disconnectWallet }
                        sx={{
                            fontSize: {
                                xs: '0.6rem',
                                sm: '0.8rem'
                            },
                            px: 1, py: 0.25
                        }}
                    >
                        Disconnect
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ changeAccount }
                        sx={{
                            fontSize: {
                                xs: '0.6rem',
                                sm: '0.8rem'
                            },
                            px: 1, py: 0.25
                        }}
                    >
                        Change
                    </Button>
                </Box>
            </Box>

            <Typography
                fontSize="2rem"
                textAlign="center"
                sx={{ mt: 2, mb: 3 }}
            >
                <span style={{ textTransform: 'capitalize' }}>
                    { getNetwork().name }
                </span>
                : { balance } { currency }
            </Typography>

            <Link href="/dashboard">
                <a>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={ onClose }
                    >
                        Go to Dashboard
                    </Button>
                </a>
            </Link>
        </DialogBox>
    );
};

export default UserAccountDialog;