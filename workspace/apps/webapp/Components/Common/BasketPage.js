import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {
  Snackbar,
  Alert,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import axios from 'axios';
import Web3 from 'web3';
import Confetti from 'react-confetti';
import { getRequest } from '../../axios';
import Explore from './Explore';
import BasketInvest from '../Explore/BasketInvest';

const getBasketData = async (bid) =>
  await (
    await getRequest(`/basket/${bid}`)
  ).data;

const getGraphDataWithGrowthRates = async (basketData, days) =>
  (
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/graph_data`, {
      basketData,
      days,
    })
  ).data;

const getCoinPrices = async (coins) =>
  await (
    await getRequest(`/price?coins=${JSON.stringify(coins)}`)
  ).data;

const BasketPage = () => {
  const mdDown = useMediaQuery(useTheme().breakpoints.down('md'));

  const router = useRouter();
  const { bid } = router.query;
  const [days, setDays] = useState(1);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const [coinDetails, setCoinDetails] = useState(null);
  const [amount, setAmount] = useState('');
  const [transactionIsSuccess, setTransactionIsSuccess] = useState(false);

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

  const tokens = basket?.coins?.map((token) => ({
    ...token,
    amount: (amount * token.weight) / 100,
  }));

  const {
    data: graphDataWithGrowthRates,
    isLoading: isGraphLoading,
    isFetching: isGraphFetching,
  } = useQuery(
    ['basketGraph', bid, days],
    () => getGraphDataWithGrowthRates(basket?.coins, days),
    {
      staleTime: 300000,
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

  const { data: coinPrices, isFetching: isCoinPriceFetching } = useQuery(
    ['coinPrices', bid],
    () => getCoinPrices(basket?.coins),
    {
      staleTime: 300000,
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: "Couldn't fetch Coin Price data.",
        });
      },
      enabled: !!basket?.coins,
    }
  );

  useEffect(() => {
    if (!isCoinPriceFetching && coinPrices) {
      const growthRates = graphDataWithGrowthRates?.growthPercentageOfCoins;
      const formattingCoins = basket?.coins.map((coin, i) => [
        {
          ...coin,
          price: coinPrices?.[i]['usd'],
          withWeight: growthRates?.[i]['withWeight'],
          growthRate: growthRates?.[i]['growthRate'],
        },
      ]);
      setCoinDetails(formattingCoins?.flat());
    }
  }, [isCoinPriceFetching, coinPrices, graphDataWithGrowthRates]);

  const handleInvest = async () => {
    const buyTokens = [];
    const sellAmounts = [];
    const takerAddress = localStorage.getItem('address');
    const sellToken = 'MATIC';

    for (let coin of basket?.coins) {
      buyTokens.push(coin.coinAddress);
      const amount = (0.001 * coin.weight) / 100;
      sellAmounts.push(amount * 10 ** 18);
    }

    const params = {
      buyTokens: [...buyTokens],
      sellAmounts: [...sellAmounts],
      takerAddress,
      sellToken,
    };

    const web3 = new Web3(Web3.givenProvider);

    const WETHMUMBAI_NET = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa';
    const LINK_TEST_NET = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
    const testCoins = [LINK_TEST_NET, WETHMUMBAI_NET];
    const userInvestedCoins = [];

    const testNet = 'https://mumbai.api.0x.org/';
    const mainNet = 'https://polygon.api.0x.org/';

    const quotes = [];
    for (let i = 0; i < params.buyTokens.length; i++) {
      const response = await fetch(
        `${testNet}swap/v1/quote?sellToken=${params.sellToken}&buyToken=${testCoins[i]}&sellAmount=${params.sellAmounts[i]}&takerAddress=${params.takerAddress}`
      );
      const quote = await response.json();
      quotes.push(quote);
    }
    const batch = new web3.BatchRequest();

    await new Promise(function (resolve, reject) {
      for (let i = 0; i < quotes.length; i++) {
        batch.add(
          web3.eth.sendTransaction.request(quotes[i], (error, data) => {
            if (data) {
              userInvestedCoins.push(testCoins[i]);
            } else {
              console.log(error);
            }

            if (i + 1 === quotes.length) resolve();
          })
        );
      }
      batch.execute();
    });

    return userInvestedCoins;
  };

  const handleStoreInvest = async () => {
    setTransactionIsSuccess(false);
    const investedCoins = await handleInvest();
    const filterInvestedCoins = Object.values(basket?.coins).filter((coin, i) =>
      investedCoins.includes(coin.coinAddress)
    );

    const data = {
      basketId: basket?._id,
      coins: filterInvestedCoins,
      userAddress: localStorage.getItem('address'),
      amount: parseInt('250'),
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/invest/new`, {
        data: data,
      })
      .then((res) => {
        console.log(res);
        setAlert({
          open: true,
          severity: 'success',
          message: "Hurray! You've Successfully Invested in this Basket.",
        });
        setTransactionIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setTransactionIsSuccess(false);
      });
  };

  return (
    <>
      {typeof window !== undefined && transactionIsSuccess && (
        <Confetti
          width={window?.innerWidth}
          height={window?.innerHeight}
          recycle={true}
          numberOfPieces={2000}
        />
      )}
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

      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Explore
              isLoading={isLoading}
              isFetching={isFetching}
              basket={basket}
              graphData={graphDataWithGrowthRates?.graphData}
              setDays={setDays}
              showDetails={true}
              coins={coinDetails}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            {!mdDown && (
              <Paper
                elevation={0}
                sx={{
                  position: 'sticky',
                  top: '90px',
                  width: '100%',
                  padding: '2rem 1rem 2.5rem',
                  border: '1px solid #ddda',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Invest in Basket
                </Typography>

                <BasketInvest
                  tokens={tokens}
                  amount={amount}
                  setAmount={setAmount}
                />

                <Button
                  variant="contained"
                  onClick={handleStoreInvest}
                  fullWidth
                >
                  Invest
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BasketPage;
