import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Overview from '../../Components/dashboard/Overview';
import YourPortfolio from '../../Components/dashboard/YourPortfolio';
import SideNavigationLayout from '../../Components/Common/SideNavigationLayout';
import { useSelector } from 'react-redux';
import { getUserAddress } from 'apps/webapp/features/userAddress';
import Profile from '../profile';
import Head from 'next/head';

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
  // const [userAddress, setUserAddress] = useState(undefined);
  const { userAddress } = useSelector(getUserAddress);
  // const getUserAddress = () => userAddress;

  // useEffect(() => {
  //   setUserAddress(getUserAddress);
  // }, []);

  return (
    <>
      <Head>
        <title>Basketo | Dashboard</title>
      </Head>
      <SideNavigationLayout userAddress={userAddress}>
        <Profile />
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {/* <Profile /> */}
          {/* <Overview /> */}
          <YourPortfolio userAddress={userAddress} />
        </Box>
      </SideNavigationLayout>
    </>
  );
};

export default Dashboard;
