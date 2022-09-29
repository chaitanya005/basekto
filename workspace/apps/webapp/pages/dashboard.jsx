import { Box, Typography, Card, Chip, Button, Divider } from '@mui/material';
import { Navigation } from '@basketo/web-ui';
import Overview from '../Components/dashboard/Overview';
import {
  AccountCircle,
  DashboardRounded,
  Explore,
  Notifications,
} from '@mui/icons-material';
import YourPortfolio from '../Components/dashboard/YourPortfolio';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const data = [
  { pv: 2400 },
  { pv: 1398 },
  { pv: 9800 },
  { pv: 3908 },
  { pv: 4800 },
  { pv: 3800 },
  { pv: 4300 },
];

const Dashboard = () => {
  const router = useRouter();

  const navigationInfo = [
    {
      route: '/dashboard',
      onClick: () => router.push({ hash: '' }),
      label: 'Overview',
      icon: <DashboardRounded />,
    },
    {
      route: '/dashboard#notifications',
      onClick: () => router.push({ hash: '#notifications' }),
      label: 'Notifications',
      icon: <Notifications />,
    },
    {
      route: '/my-profile',
      onClick: () => router.push({ pathname: '/my-profile' }),
      label: 'Profile',
      icon: <AccountCircle />,
    },
    {
      route: '/explore',
      onClick: () => router.push({ pathname: '/explore' }),
      label: 'Explore',
      icon: <Explore />,
    },
  ];

  const [basket, setBasket] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    //   setUserAddress(localStorage.getItem('address'));
    //setIsLoading(true);
    async function fetchData() {
      await axios
        .get(
          `http://localhost:8000/api/baskets/0x5557661D73f5e8C11AfB926817a21d891A13188f`
        )
        .then((basketData) => {
          setBasket(basketData.data[0]);
          setIsLoading(false);
        })
        .catch((e) => {
          setBasket(null);
          console.log(e);
        });
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Navigation navInfo={navigationInfo} showThemeToggle />
      {/* 2:1 grid layout  */}
      <Box
        sx={{
          padding: '20px',
          width: '100%',
          maxWidth: 'lg',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr', gap: '20px' },
        }}
      >
        {/* left side part */}
        <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          {/* wallet address and blockchain info */}
          <Box
            sx={{
              margin: '15px 0px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Chip
              variant="outlined"
              sx={{ margin: '0px 10px' }}
              label={'0x124...45345'}
            />
            <Chip variant="standard" label={'Ethereum Mainnet'} />
          </Box>

          <Overview />
          <YourPortfolio
            basketData={basket}
            showPortfolioBaskets={basket && true}
          />
        </Box>

        {/* right side part  */}
        <Box>
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              height: '500px',
              borderRadius: '15px',
              padding: '15px 20px',
            }}
          >
            <Box>
              <Typography variant="h3">
                000.00
                <Typography component="span" variant="caption">
                  USDT
                </Typography>
              </Typography>
              <Typography variant="caption" fontSize={'12px'}>
                WALLET BALANCE
              </Typography>
              <Button variant="outlined" fullWidth sx={{ mt: '20px' }}>
                Connect another wallet
              </Button>
            </Box>
            <Divider sx={{ margin: '20px 0px' }} />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
