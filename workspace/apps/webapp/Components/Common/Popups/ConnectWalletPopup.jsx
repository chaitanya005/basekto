import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogBox from '../DialogBox';
import RequestingPopup from './RequestingPopup';

const ConnectWalletPopup = ({ isOpen, onClose, connectWallet, onComplete }) => {

    const [requesting, setRequesting] = useState(false);
    const [error, setError] = useState('');

    const onClick = () => {

        setError('');
        setRequesting(true);
        connectWallet().then(() => {
            setError('');
            onComplete();
        }).catch((err) => {
            if (err.code === -32002) {
                setError('Something went wrong! A request to connect wallet may already be ongoing, please check, or try again');
            }
        }).finally(() =>
            setRequesting(false)
        );
    };

    return (

        <>
            <RequestingPopup
                isOpen={ requesting }
            />

            <DialogBox
                title="Connect Wallet"
                open={ isOpen }
                onClose={ onClose }
                dividers
            >
                <Typography marginBottom={ 2 }>
                    Please connect your Metamask wallet to continue
                </Typography>

                <Typography
                    color="error"
                    fontSize="small"
                    textAlign="center"
                    marginBottom={ 1.5 }
                >
                    { error }
                </Typography>

                <Button
                    color="primary"
                    variant="contained"
                    onClick={ onClick }
                    fullWidth
                >
                    Connect Wallet
                </Button>
            </DialogBox>
        </>
    );
}

export default ConnectWalletPopup;