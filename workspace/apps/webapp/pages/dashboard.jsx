import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { onAccountsChanged } from '@basketo/web-utils';
import Overview from '../Components/dashboard/Overview';
import YourPortfolio from '../Components/dashboard/YourPortfolio';
import SideNavigationLayout from '../Components/Common/SideNavigationLayout';

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

  const [userAddress, setUserAddress] = useState(undefined);
  const getUserAddress = () => localStorage.getItem('address');

  useEffect(() => {
    setUserAddress(getUserAddress);
  }, []);

  onAccountsChanged(() =>
    setUserAddress(getUserAddress())
  );

  return (

    <SideNavigationLayout userAddress={ userAddress }>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        <Overview />
        <YourPortfolio userAddress={ userAddress } />
      </Box>
    </SideNavigationLayout>
  );
};

export default Dashboard;
