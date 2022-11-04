import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert, Skeleton } from '@mui/material';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { BasketCard } from '@basketo/web-ui';
import axios from 'axios';

const getBasketData = async (queryString) =>
  (
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/baskets` + queryString
    )
  ).data;

const Baskets = ({ queryString }) => {
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const {
    data: basketsData,
    isLoading,
    isFetching,
  } = useQuery('exploreBaskets', () => getBasketData(queryString), {
    onError: () => {
      setAlert({
        open: true,
        severity: 'error',
        message: 'Something went wrong.',
      });
    },
  });

  return (
    <>
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={2}>
          {isLoading || isFetching ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                  <Skeleton
                    sx={{
                      borderRadius: '15px',
                      width: '100%',
                      height: '300px',
                    }}
                    animation="wave"
                  />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {basketsData?.baskets?.map((basket, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                  <Link href={'/explore/' + basket?._id}>
                    <a>
                      <BasketCard
                        data={{
                          title: basket?.name,
                          symbol: basket?.symbol,
                          basketeer: basket?.accountId,
                          description: basket?.description,
                          basketGrowth: basket?.growthRate,
                          coins: basket?.coins,
                        }}
                        showDescription
                        showFollow
                        showGrowth
                      />
                    </a>
                  </Link>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Baskets;
