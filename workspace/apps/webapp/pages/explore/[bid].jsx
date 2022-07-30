import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Graph from '../../Components/Common/Graph';
import { Paper, Snackbar, Alert, Skeleton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';

const getBasketData = async (bid) =>
  (await fetch('https://basketo-api.herokuapp.com/api/basket/' + bid)).json();

const getGraphData = async (basketData, days) =>
  (
    await fetch('https://basketo-api.herokuapp.com/api/graph_data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ basketData, days }),
    })
  ).json();

const Basket = () => {
  const router = useRouter();
  const { bid } = router.query;
  const [days, setDays] = useState(1);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const {
    data: basket,
    isLoading,
    isFetching,
  } = useQuery(['basketPage', bid], () => getBasketData(bid), {
    onError: () => {
      setAlert({
        open: true,
        severity: 'error',
        message: 'Something went wrong.',
      });
    },
    enabled: !!bid,
  });

  const {
    data: graphData,
    isLoading: isGraphLoading,
    isFetching: isGraphFetching,
  } = useQuery(
    ['basketGraph', bid, days],
    () => getGraphData(basket?.coins, days),
    {
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: "Couldn't fetch Graph data.",
        });
      },
      enabled: !!basket?.coins,
    }
  );

  return (
    <Paper variant="window">
      <Snackbar
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        open={alert.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alert?.severity} sx={{ width: '100%' }}>
          {alert?.message}
        </Alert>
      </Snackbar>
      <Navbar />
      <div style={{ paddingTop: '70px' }}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Back
          </Button>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 4, mb: 4 }}
          >
            <Box display="flex" alignItems="center" sx={{ '> *': { mr: 2 } }}>
              {isLoading || isFetching ? (
                <Skeleton
                  variant="circular"
                  sx={{ width: 48, height: 48 }}
                  animation="wave"
                />
              ) : (
                <Avatar
                  src={basket?.image}
                  alt={basket?.symbol + ' logo'}
                  sx={{ width: 48, height: 48 }}
                />
              )}

              {isLoading || isFetching ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: '90px', height: '20px' }}
                />
              ) : (
                <Typography
                  variant="h3"
                  sx={{ fontSize: '2rem', fontWeight: 'bold' }}
                >
                  {basket?.name}
                </Typography>
              )}
            </Box>
            <Tooltip title="Coming soon!">
              <Button variant="contained" size="large">
                Invest
              </Button>
            </Tooltip>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Graph data={graphData} setDays={setDays} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#777',
                  }}
                >
                  Token
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#777',
                  }}
                >
                  Weight {'(%)'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 1, mb: 1.5 }} />

            {(isLoading || isFetching
              ? Array.from({ length: 3 })
              : basket?.coins
            )?.map((coin, i) => (
              <Grid container justifyContent="space-between" key={i}>
                <Grid item display="flex" alignItems="center" sx={{ mb: 2 }}>
                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="circular"
                      sx={{ width: 28, height: 28 }}
                      animation="wave"
                    />
                  ) : (
                    <Avatar
                      src={coin?.image}
                      alt={coin?.name + ' logo'}
                      sx={{ mr: 2.5, width: 28, height: 28 }}
                    />
                  )}

                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="text"
                      sx={{ width: '60px', ml: '20px' }}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {coin.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item>
                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="text"
                      sx={{ width: '30px' }}
                      animation="wave"
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {coin?.weight}%
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>

          <Box>
            <Typography variant="h5">About</Typography>

            <Divider sx={{ mt: 1, mb: 1 }} />

            {isLoading || isFetching ? (
              <>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: '100%' }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: '70%' }}
                />
              </>
            ) : (
              <Typography>{basket?.description}</Typography>
            )}
          </Box>
        </Container>
        <Footer />
      </div>
    </Paper>
  );
};

export default Basket;
