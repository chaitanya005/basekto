import Link from 'next/link';
import {
  Container,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTheme } from '@emotion/react';

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

      <Link href="/explore">
        <a>
          <Button
            variant="contained"
            sx={{ fontSize: '18px' }}
            startIcon={
              <ArrowCircleUpIcon
                style={{ transform: 'rotate(90deg)', fontSize: '25px' }}
              />
            }
          >
            Explore Baskets
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default Hero;
