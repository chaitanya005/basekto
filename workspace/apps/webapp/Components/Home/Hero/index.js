import Link from 'next/link';
import {
  Container,
  Button,
  CardActions,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTheme } from '@emotion/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Hero = () => {
  const currentTheme = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '60px',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: { xs: '42px', md: '75px' },
          fontWeight: '800',
          lineHeight: '1.2em',
          mb: '30px',
          fontFamily: 'Cinzel',
        }}
      >
        Invest in diversified crypto portfolios with&nbsp;
        <span
          style={{
            color: currentTheme.palette.mode == 'light' ? '#0B754E' : '#B0FFE2',
          }}
        >
          Basketo
        </span>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <Link href="/explore">
          <a>
            <Button
              variant="contained"
              sx={{ fontSize: '16px' }}
              startIcon={
                <ArrowCircleUpIcon
                  style={{ transform: 'rotate(90deg)', fontSize: '25px' }}
                />
              }
            >
              Explore{' '}
              <Typography
                sx={{
                  display: { xs: 'none', md: 'block' },
                  marginLeft: '5px',
                }}
                variant="span"
              >
                {' '}
                Baskets
              </Typography>
            </Button>
          </a>
        </Link>
        <Link href="/create">
          <a>
            <Button
              variant="outlined"
              sx={{ fontSize: '16px' }}
              startIcon={<AddCircleOutlineIcon style={{ fontSize: '25px' }} />}
            >
              Create{' '}
              <Typography
                sx={{
                  display: { xs: 'none', md: 'block' },
                  marginLeft: '5px',
                }}
                variant="span"
              >
                {' '}
                a Basket
              </Typography>
            </Button>
          </a>
        </Link>
      </Box>
    </Container>
  );
};

export default Hero;
