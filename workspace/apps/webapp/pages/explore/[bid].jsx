import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Web3 from 'web3';
import axios from 'axios';
import Confetti from 'react-confetti';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Explore from '../../Components/Common/Explore';
import SideSection from '../../Components/Explore/SideSection';
import SwitchNetworkPopup from '../../Components/Common/Popups/SwitchNetworkPopup';
import LoadingPopup from '../../Components/Common/Popups/LoadingPopup';
import {
  getBasketData,
  getGraphDataWithGrowthRates,
  getCoinPrices,
  getInvestmentsData,
  isValidNetwork,
} from '@basketo/web-utils';

const publishBasket = async (userAddress, basketId) =>
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/basket/publish`, {
    userAddress,
    basketId,
  });

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
  const [networkInvalid, setNetworkInvalid] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionIsSuccess, setTransactionIsSuccess] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [tokensWithAmount, setTokensWithAmount] = useState(null);
  const timeFrames = {
    1: '1 Day',
    7: '1 Week',
    30: '1 Month',
    365: '1 Year',
  };

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

  useEffect(() => {
    const tokens = basket?.coins?.map((token) => ({
      ...token,
      amount: parseFloat((amount * token.weight) / 100),
    }));
    setTokensWithAmount(tokens);
  }, [amount]);

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
      const formattingCoins = basket?.coins.map((coin, i) => [
        {
          ...coin,
          price: coinPrices?.[i]['usd'],
          // withWeight: growthRates?.[i]['withWeight'],
          // growthRate: growthRates?.[i]['growthRate'],
        },
      ]);
      setCoinDetails(formattingCoins?.flat());
    }
  }, [isCoinPriceFetching, coinPrices, graphDataWithGrowthRates]);

  useEffect(() => {
    const userAddress = localStorage.getItem('address');
    setUserAddress(userAddress);
  }, []);

  const {
    data: investments,
    refetch: refetchInvestments
  } = useQuery(
    ['investment', basket?._id, userAddress],
    () => getInvestmentsData(basket?._id),
    {
      enabled: !!basket,
    }
  );

  const handleInvest = async () => {
    const buyTokens = [];
    const sellAmounts = [];
    const takerAddress = localStorage.getItem('address');
    const sellToken = 'MATIC';

    for (let coin of basket?.coins) {
      buyTokens.push(coin.coinAddress);
      const enteredAmount = (amount * coin.weight) / 100;
      sellAmounts.push(enteredAmount * 10 ** 18);
    }

    const params = {
      buyTokens: [...buyTokens],
      sellAmounts: [...sellAmounts],
      takerAddress,
      sellToken,
    };

    const web3 = new Web3(Web3.givenProvider);

    // const WETHMUMBAI_NET = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa';
    // const LINK_TEST_NET = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
    // const testCoins = [LINK_TEST_NET, WETHMUMBAI_NET];
    const userInvestedCoins = [];
    const testNet = 'https://mumbai.api.0x.org/';
    const mainNet = 'https://polygon.api.0x.org/';
    // need to check the user's network and change according to the test net or main net
    // ...
    const url =
      process.env.NEXT_PUBLIC_ENV === 'testnet'
        ? `${testNet}swap/v1/quote`
        : `${mainNet}swap/v1/quote`;

    const quotes = [];
    for (let i = 0; i < params.buyTokens.length; i++) {
      const response = await fetch(
        `${url}?sellToken=${params.sellToken}&buyToken=${buyTokens[i]}&sellAmount=${params.sellAmounts[i]}&takerAddress=${params.takerAddress}`
      );
      const quote = await response.json();
      if (response.status !== 200) {
        setAlert({
          open: true,
          severity: 'error',
          message: quote?.validationErrors?.[0].reason || quote?.reason,
        });
        setIsInvesting(false);
        return;
      }
      quotes.push(quote);
    }
    const batch = new web3.BatchRequest();

    await new Promise(function (resolve, reject) {
      for (let i = 0; i < quotes.length; i++) {
        batch.add(
          web3.eth.sendTransaction.request(quotes[i], (error, data) => {
            if (data) {
              console.log(data);
              // userInvestedCoins.push(testCoins[i]);
              userInvestedCoins.push(buyTokens[i]);
            } else {
              console.log(error);
            }

            if (i + 1 === quotes.length) resolve();
          })
        );
      }
      batch.execute();
    });
    setIsInvesting(false);
    return userInvestedCoins;
  };

  const handleStoreInvest = async () => {
    setTransactionIsSuccess(false);
    setIsInvesting(true);
    if (!localStorage.getItem('address')) {
      setAlert({
        open: true,
        severity: 'error',
        message: 'Please connect your wallet and try again!',
      });
      setIsInvesting(false);
      return;
    }

    if (!(await isValidNetwork())) {
      setNetworkInvalid(true);
      setIsInvesting(false);
      return;
    }
    const investedCoins = await handleInvest();
    const filterInvestedCoins = Object.values(basket?.coins).filter((coin) =>
      investedCoins?.includes(coin.coinAddress)
    );

    if (filterInvestedCoins.length > 0) {
      const data = {
        basketId: basket?._id,
        coins: filterInvestedCoins,
        userAddress: localStorage.getItem('address'),
        amount: amount,
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
          refetchInvestments();
          setTransactionIsSuccess(true);
          setIsInvesting(false);
        })
        .catch((err) => {
          console.log(err);
          setTransactionIsSuccess(false);
          setIsInvesting(false);
        });
    }
  };

  const handlePublish = async () => {
    try {
      const newPublishment = await publishBasket(userAddress, basket?._id);
      if (newPublishment) {
        setAlert({
          open: true,
          severity: 'success',
          message: 'Successfully Published this Basket!',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {typeof window !== 'undefined' && transactionIsSuccess && (
        <Confetti
          confettiSource={{
            x: 0,
            y: window?.scrollY,
            w: window?.innerWidth,
            h: 0,
          }}
          width={window?.innerWidth}
          height={window?.document.body.scrollHeight}
          recycle={false}
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

      <LoadingPopup
        isOpen={isInvesting}
        title="Requesting Wallet"
        text="Waiting for your confirmation to invest in the basket"
      />

      <SwitchNetworkPopup
        isOpen={networkInvalid}
        onClose={() => setNetworkInvalid(false)}
        onComplete={async () => {
          if (await isValidNetwork()) {
            setNetworkInvalid(false);
            handleStoreInvest();
          }
        }}
      />

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
              isLoading={isLoading || isFetching}
              basket={basket}
              graphDataWithGrowthRates={graphDataWithGrowthRates?.graphData}
              isGraphLoading={isGraphLoading || isGraphFetching}
              setDays={setDays}
              days={days}
              showDetails={true}
              coins={coinDetails}
              tokens={tokensWithAmount}
              amount={amount}
              setAmount={setAmount}
              investments={investments}
              refetchInvestments={refetchInvestments}
              handleStoreInvest={handleStoreInvest}
              isCoinsDataLoading={
                isLoading || isFetching || isCoinPriceFetching
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {!mdDown && (
              <SideSection
                tokens={tokensWithAmount}
                amount={amount}
                setAmount={setAmount}
                handleStoreInvest={handleStoreInvest}
                investments={investments}
                graphDataWithGrowthRates={graphDataWithGrowthRates}
                timeFrame={`Past ${timeFrames[days]}`}
                basket={basket}
                userAddress={userAddress}
                handlePublish={handlePublish}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BasketPage;
