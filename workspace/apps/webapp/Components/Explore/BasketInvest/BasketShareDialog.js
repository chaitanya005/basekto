import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Divider, InputAdornment, TextField } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {

    const { children, onClose, ...other } = props;

    return (

        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const socialMedias = [
    { name: 'Twitter', Icon: TwitterIcon },
    { name: 'WhatsApp', Icon: WhatsAppIcon },
    { name: 'Telegram', Icon: TelegramIcon },
    { name: 'Facebook', Icon: FacebookIcon },
    { name: 'Reddit', Icon: RedditIcon },
];

const BasketShareDialog = ({ open, setOpen }) => {

    const shareLink = typeof window !== 'undefined' && window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <BootstrapDialog
            onClose={ handleClose }
            open={ open }
        >
            <BootstrapDialogTitle onClose={ handleClose }>
                Share
            </BootstrapDialogTitle>

            <DialogContent sx={{ mb: 1.5 }}>
                <Divider sx={{ mb: 3 }} />

                <Box display="flex" gap={ 4 } sx={{ mb: 5, px: 1 }}>
                    { socialMedias.map(({ name, Icon }) => (

                        <Box
                            key={ name }
                            // onClick={}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography fontSize="0.725rem" gutterBottom>
                                { name }
                            </Typography>
                            <Icon
                                fontSize="large"
                                sx={{ fontSize: '2.75rem' }}
                            />
                        </Box>
                    ))}
                </Box>

                <Box>
                    <TextField
                        label="Share Link"
                        value={ shareLink }
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={ copyToClipboard }>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

export default BasketShareDialog;