import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, InputAdornment, TextField } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogBox from '../../Common/DialogBox';

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

    return (

        <DialogBox
            title="Share"
            divider
            open={ open }
            onClose={ () => setOpen(false) }
        >
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
        </DialogBox>
    );
};

export default BasketShareDialog;