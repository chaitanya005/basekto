import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import BasketList from '../Components/Common/BasketList';
import YourProfile from '../Components/Profile';
import { getPublishedBasketsByUser, getUserAddressByPublicUrl } from '@basketo/web-utils';

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

  return userAddress && (
    <>
      <Head>
        <title>{[`Basketo | ${publicUrl.toString()}`]}</title>
      </Head>
      <Snackbar
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        open={alert.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={alert?.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="lg">
        <YourProfile userAddress={userAddress} />
        <BasketList
          basketsData={userPublishedBaskets}
          isLoading={isBasketsLoading}
          showDescription
        />
      </Container>
    </>
  );
};

export default UserPublishedBaskets;
