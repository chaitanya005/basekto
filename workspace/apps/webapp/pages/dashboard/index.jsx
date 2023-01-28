import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Overview from '../../Components/dashboard/Overview';
import YourPortfolio from '../../Components/dashboard/YourPortfolio';
import SideNavigationLayout from '../../Components/Common/SideNavigationLayout';
import { useSelector } from 'react-redux';
import { getUserAddress } from 'apps/webapp/features/userAddress';
import Profile from '../profile';
import Head from 'next/head';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import Explore from '@mui/icons-material/Explore';
import Notifications from '@mui/icons-material/Notifications';
import { useRouter } from 'next/router';

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
  const { userAddress } = useSelector(getUserAddress);
  const router = useRouter();
  const navigationInfo = [
    {
      route: '/dashboard',
      onClick: () => router.push({ pathname: '/dashboard' }),
      label: 'Overview',
      icon: <DashboardRounded />,
    },
    // {
    //     route: '/dashboard#notifications',
    //     onClick: () => router.push({ hash: '#notifications' }),
    //     label: 'Notifications',
    //     icon: <Notifications />,
    // },
    // {
    //     route: '/profile',
    //     onClick: () => router.push({ pathname: '/profile' }),
    //     label: 'Profile',
    //     icon: <AccountCircle />,
    // },
    {
      route: '/explore',
      onClick: () => router.push({ pathname: '/explore' }),
      label: 'Explore',
      icon: <Explore />,
    },
  ];

  return (
    <>
      <Head>
        <title>Basketo | Dashboard</title>
      </Head>
      <SideNavigationLayout
        userAddress={userAddress}
        navigationInfo={navigationInfo}
      >
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
