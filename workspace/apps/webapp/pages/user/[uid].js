import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Container from '@mui/material/Container';
import AlertBox from 'apps/webapp/Components/Common/AlertBox';
import BasketList from '../../Components/Common/BasketList';
import YourProfile from '../../Components/Profile';
import {
  getPublishedBasketsByUser,
  getUserAddressByPublicUrl
} from '@basketo/web-utils';

const UserPublishedBaskets = () => {
  const router = useRouter();
  const { uid: publicUrl } = router.query;
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const { data: userAddress } = useQuery(
    ['userAddress', publicUrl],
    () => getUserAddressByPublicUrl(publicUrl),
    { enabled: !!publicUrl }
  );

  const {
    data: userPublishedBaskets,
    isLoading: isBasketsLoading,
    isStale: isBasketsStale,
    refetch: refetchBaskets,
  } = useQuery(
    ['publishedBaskets', userAddress],
    () => getPublishedBasketsByUser(userAddress),
    {
      staleTime: 60000,
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'Something went wrong.',
        });
      },
      enabled: !!userAddress,
    }
  );

  if (isBasketsStale) refetchBaskets();

  return (
    <>
      <Head>
        <title>{[`Basketo | ${publicUrl.toString()}`]}</title>
      </Head>
      <AlertBox alert={alert} setAlert={setAlert} />

      <Container maxWidth="lg">
        <YourProfile userAddress={userAddress} />
        <BasketList
          basketsData={userPublishedBaskets?.baskets}
          isLoading={isBasketsLoading}
          showDescription
          showGraph
          showGrowth
        />
      </Container>
    </>
  );
};

export default UserPublishedBaskets;
