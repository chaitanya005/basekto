import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import CampaignIcon from '@mui/icons-material/Campaign';

const Subscription = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setEmail('');
  }

  return (
    <Paper
      variant="section"
      color="primary"
      style={{
        margin: '4rem 0',
        padding: '4rem 0',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          flexDirection="column"
          sx={{ textAlign: 'center' }}
        >
          <Grid item xs={12} md={5} lg={4.5} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography
              component="div"
              fontSize="2rem"
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ mb: 2 }}
            >
              Get Latest Updates
              <CampaignIcon sx={{ fontSize: 'inherit' }} />
            </Typography>
          </Grid>

          <Grid item xs={12} md={5} lg={4.5}>
            <a
              href="https://t.me/basketofinance"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{
                  width: '420px',
                  maxWidth: '100%',
                  fontSize: '1rem',
                }}
                endIcon={<TelegramIcon />}
              >
                Join us on Telegram
              </Button>
            </a>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Subscription;
