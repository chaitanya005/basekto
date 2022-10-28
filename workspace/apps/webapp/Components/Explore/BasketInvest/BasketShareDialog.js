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
import {
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  TelegramShareButton,
  RedditShareButton,
} from 'next-share';

const BasketShareDialog = ({ open, setOpen }) => {
  const shareLink = typeof window !== 'undefined' && window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <DialogBox
      title="Share"
      dividers
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box display="flex" gap={4} sx={{ mb: 5, px: 1 }}>
        <Box
          // onClick={}
          display="flex"
          flexDirection="row"
          alignItems="center"
          textAlign="center"
          sx={{ cursor: 'pointer' }}
          gap={{ xs: '1rem', sm: '2.5rem' }}
        >
          <TwitterShareButton
            url={shareLink}
            title={
              'Here is our Trending Basket which helps me to earn a lot!!!'
            }
            // hashtags= {"#nextshare"}
            blankTarget={true}
            hashtag={'#basketofinance #yoo'}
          >
            <TwitterIcon fontSize="large" sx={{ fontSize: '2.75rem' }} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareLink}
            title={
              'Here is our Trending Basket which helps me to earn a lot!!!'
            }
            blankTarget={true}
            hashtag={'#basketofinance'}
            // separator=":: "
          >
            <WhatsAppIcon fontSize="large" sx={{ fontSize: '2.75rem' }} />
          </WhatsappShareButton>
          <FacebookShareButton
            url={shareLink}
            quote={
              'Here is our Trending Basket which helps me to earn a lot!!!'
            }
            blankTarget={true}
            hashtag={'#basketofinance'}
          >
            <FacebookIcon fontSize="large" sx={{ fontSize: '2.75rem' }} />
          </FacebookShareButton>
          <TelegramShareButton
            url={shareLink}
            title={
              'Here is our Trending Basket which helps me to earn a lot!!!'
            }
            blankTarget={true}
            hashtag={'#basketofinance'}
          >
            <TelegramIcon fontSize="large" sx={{ fontSize: '2.75rem' }} />
          </TelegramShareButton>
          <RedditShareButton
            url={shareLink}
            title={
              'Here is our Trending Basket which helps me to earn a lot!!!'
            }
            blankTarget={true}
            hashtag={'#basketofinance'}
          >
            <RedditIcon fontSize="large" sx={{ fontSize: '2.75rem' }} />
          </RedditShareButton>
        </Box>
      </Box>

      <Box>
        <TextField
          label="Share Link"
          value={shareLink}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={copyToClipboard}>
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
