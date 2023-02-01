import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ethAddEventListener } from '@basketo/web-utils';
import YourProfile from '../Components/Profile';
import { useSelector } from 'react-redux';
import { getUserAddress } from '../features/userAddress';

const Profile = () => {
  const router = useRouter();
  const { userAddress } = useSelector(getUserAddress);

  if (userAddress === null) {
    router.push('/#connect-wallet');
  }

  useEffect(() => {
    const updateUserAddress = () => userAddress;

    updateUserAddress();
    const cleanup = ethAddEventListener('accountsChanged', updateUserAddress);
    return cleanup;
  }, []);

  return userAddress && <YourProfile userAddress={userAddress} />;
};

export default Profile;
