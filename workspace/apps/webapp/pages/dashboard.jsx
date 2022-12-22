import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import Explore from '@mui/icons-material/Explore';
import Notifications from '@mui/icons-material/Notifications';
import { Navigation } from '@basketo/web-ui';
import Overview from '../Components/dashboard/Overview';
import YourPortfolio from '../Components/dashboard/YourPortfolio';
import DialogBox from '../Components/Common/DialogBox';

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

  const [createdBaskets, setCreatedBaskets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState(undefined);

  useEffect(() => {

    setUserAddress(localStorage.getItem('address'));
    setIsLoading(true);

    function fetchData() {

      axios
        .get(
          `${ process.env.NEXT_PUBLIC_BACKEND_API }/baskets/${ userAddress }`
        )
        .then((basketData) => {
          setCreatedBaskets(basketData.data);
        })
        .catch((e) => {
          setCreatedBaskets(null);
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    }
    userAddress && fetchData();
  }, [userAddress]);

  typeof window !== 'undefined' &&
    window.ethereum?.on('accountsChanged', (account) =>
      setUserAddress(null)
    );

  return (
    <>
      <DialogBox
        open={ userAddress === null }
        title={
          <Typography
            variant={ 'h5' }
            textAlign="center"
            gutterBottom
          >
            Wallet not connected!
          </Typography>
        }
        actions={
          <Button
            variant="contained"
            onClick={ () => router.push('/') }
            fullWidth
          >
            Go Back
          </Button>
        }
      >
        <Typography
          textAlign="center"
          marginBottom={ 3 }
        >
          You can&apos;t view your portfolio without your Web3 wallet. Please connect your wallet first.
        </Typography>
      </DialogBox>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Navigation navInfo={navigationInfo} showThemeToggle />
        <Box
          sx={{
            padding: '20px',
            width: '100%',
            maxWidth: 'lg',
          }}
        >
          <Box sx={{
            maxWidth: '100%',
            overflowX: 'auto'
          }}>
            <Overview />
            <YourPortfolio
              createdBaskets={ createdBaskets }
              investedBaskets={ [] }
              isLoading={ isLoading }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
