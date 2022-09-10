import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Snackbar, Alert, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import Explore from '../../Components/Common/Explore.js';
import axios from 'axios';
import BasketInvest from 'apps/webapp/Components/Explore/BasketInvest/index.js';

const getBasketData = async (bid) => (

  await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/basket/${bid}`
  )
).data;

const getGraphData = async (basketData, days) => (

  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/graph_data`,
    { basketData, days }
  )
).data;

const Basket = () => {
  const router = useRouter();
  const { bid } = router.query;
  const [days, setDays] = useState(1);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  // const [basketCoins, setBasketCoins] = useState(null);
  const [coinGrowthRates, setCoinGrowthRates] = useState(null)

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

  useEffect(() => {
    getPrices();
  }, [basket]);

  const getPrices = async () => {
    if (basket) {
      const coinPrices = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/price?coins=${JSON.stringify(
          basket?.coins
        )}`
      );
      const formattingCoinPrices = basket.coins.map((coin, i) => [
        { ...coin, price: coinPrices.data[i]['usd'] },
      ]);
      getGrowthRates(formattingCoinPrices.flat());
    }
  };

  const getGrowthRates = async (coins) => {
    if (basket) {
      const growthRates = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_API
        }/growth-rate?coins=${JSON.stringify(basket?.coins)}`
      );
      const formattingGrowthRates = coins.map((coin, i) => [
        {
          ...coin,
          withWeight: growthRates.data[i]['withWeight'],
          growthRate: growthRates.data[i]['growthRate'],
        },
      ]);
      setCoinGrowthRates(formattingGrowthRates.flat())
    }
  };

  return (
    <>
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

      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Grid
          container
          spacing={ 4 }
        >
          <Grid item xs={ 12 } md={ 8 }>
            <Explore
              isLoading={isLoading}
              isFetching={isFetching}
              basket={basket}
              graphData={graphData}
              setDays={setDays}
              showDetails={true}
              coins={coinGrowthRates}
            />
          </Grid>

          <Grid item xs={ 12 } md={ 4 }>
            <BasketInvest />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Basket;
