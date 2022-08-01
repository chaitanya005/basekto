import { useRouter } from 'next/router';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Paper, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import Explore from '../../Components/Common/Explore.js';

const getBasketData = async (bid) =>
  // (await fetch('https://basketo-api.herokuapp.com/api/basket/' + bid)).json();
  (await fetch(process.env.NEXT_PUBLIC_BACKEND_API +'/basket/' +  bid)).json()

const getGraphData = async (basketData, days) => (
  await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/graph_data', {
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
  console.log(basket)

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

          <Explore
            isLoading={ isLoading }
            isFetching={ isFetching }
            basket={ basket }
            graphData={ graphData }
            setDays={ setDays }
            showDetails={ true }
          />
        </Container>

        <Footer />
      </div>
    </Paper>
  );
};

export default Basket;