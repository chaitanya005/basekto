import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import BasketList from '../../Common/BasketList';
import MiniGraph from '../../Common/MiniGraph';
import { demoData as graphData } from '../../../mocks/demoData';
import { getPublishedBaskets } from '@basketo/web-utils';
import AlertBox from '../../Common/AlertBox';

const Baskets = ({ queryString }) => {
  const queryCache = useQueryClient();
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
      const cachedData = queryCache.getQueryData('exploreBaskets');
      if (cachedData) {
        return cachedData;
      }
      setAlert({
        open: true,
        severity: 'error',
        message: 'Something went wrong.',
      });
    },
    staleTime: 60000,
  });

  if (basketsData !== undefined && isStale) refetch();

  return (
    <>
      <AlertBox alert={alert} setAlert={setAlert} />

      <BasketList
        basketsData={basketsData?.baskets}
        isLoading={isLoading || isFetching}
        showFollow
        showGrowth
        showGraph
        showDescription
      />
    </>
  );
};

export default Baskets;
