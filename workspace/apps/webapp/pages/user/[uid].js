import { getPublishedBasketsByUser } from '@basketo/web-utils';
import { Alert, Container, Snackbar } from '@mui/material';
import BasketList from 'apps/webapp/Components/Common/BasketList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import YourProfile from '../../Components/Profile';

const UserPublishedBaskets = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const {
    data: userPublishedBaskets,
    isLoading: isBasketsLoading,
    isStale: isBasketsStale,
    refetch: refetchBaskets,
  } = useQuery(
    ['publishedBaskets', uid],
    () => getPublishedBasketsByUser(uid),
    {
      staleTime: 60000,
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'Something went wrong.',
        });
      },
      enabled: !!uid,
    }
  );

  if (isBasketsStale) refetchBaskets();

  return (
    <>
      <Head>
        <title>{[`Basketo | ${uid.toString()}`]}</title>
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
        <YourProfile userAddress={uid} />
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
