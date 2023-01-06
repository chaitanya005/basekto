import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import BasketList from '../../Common/BasketList';
import MiniGraph from '../../Common/MiniGraph';
import { demoData as graphData } from '../../../mocks/demoData';

const getBasketData = async (queryString = '') =>
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
    isStale,
    refetch,
  } = useQuery('exploreBaskets', () => getBasketData(queryString), {
    onError: () => {
      setAlert({
        open: true,
        severity: 'error',
        message: 'Something went wrong.',
      });
    },
    staleTime: 60000,
  });

  if (isStale) refetch();

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

      <BasketList
        baskets={basketsData?.baskets}
        isLoading={isLoading || isFetching}
        showFollow
        showGrowth
        showGraph
        graph={
          <MiniGraph data={ graphData } />
        }
      />
    </>
  );
};

export default Baskets;
