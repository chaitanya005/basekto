import { useState } from 'react';
import { useQuery } from 'react-query';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import BasketList from '../../Common/BasketList';
import MiniGraph from '../../Common/MiniGraph';
import { demoData as graphData } from '../../../mocks/demoData';
import { getPublishedBaskets } from '@basketo/web-utils';

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
  } = useQuery('exploreBaskets', () => getPublishedBaskets(), {
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
        basketsData={basketsData?.baskets}
        isLoading={isLoading || isFetching}
        showFollow
        showGrowth
        // showGraph
        showDescription
      />
    </>
  );
};

export default Baskets;
