import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoRounded from '@mui/icons-material/InfoRounded';
import BasketList from '../Common/BasketList';
import MiniGraph from '../Common/MiniGraph';
import { demoData as graphData } from '../../mocks/demoData';
import { useQuery } from 'react-query';
import { Alert, Snackbar } from '@mui/material';
import { getCreatedBaskets, getInvestedBaskets } from '@basketo/web-utils';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      sx={{ mt: 4, mb: 8 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const YourPortfolio = ({ userAddress }) => {
  const sm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const [tabIndex, setTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const {
    data: userCreatedBaskets,
    isLoading: isCreatedBasketsLoading,
    isStale: isCreatedBasketsStale,
    refetch: refetchCreateBasket,
  } = useQuery(
    ['createdBaskets', userAddress],
    () => getCreatedBaskets(userAddress),
    {
      staleTime: 60000,
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'Something went wrong.',
        });
      },
      enabled: !!userAddress,
    }
  );

  if (isCreatedBasketsStale) refetchCreateBasket();

  const {
    data: userInvestedBaskets,
    isLoading: isInvestedBasketsLoading,
    isStale: isInvestedBasketsStale,
    refetch: refetchInvestBasket,
  } = useQuery(
    ['investedBaskets', userAddress],
    () => getInvestedBaskets(userAddress),
    {
      staleTime: 60000,
      onError: () => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'Something went wrong.',
        });
      },
      enabled: !!userAddress,
    }
  );

  if (isInvestedBasketsStale) refetchInvestBasket();

  return (
    <Box sx={{ mt: '20px' }}>
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
      <Typography
        variant="subtitle2"
        fontSize="12px"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        YOUR PORTFOLIO
        <Tooltip title="List of Baskets you have invested in.">
          <InfoRounded
            sx={{ height: '0.7em', width: '0.7em', color: 'divider' }}
          />
        </Tooltip>
      </Typography>

      <Box
        sx={{
          mt: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          variant={sm ? 'fullWidth' : 'standard'}
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="Created Baskets" />
          <Tab label="Invested Baskets" />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        {isCreatedBasketsLoading || userCreatedBaskets?.baskets?.length ? (
          <BasketList
            baskets={userCreatedBaskets?.baskets}
            isLoading={isCreatedBasketsLoading}
            showGrowth
            showGraph
            graph={<MiniGraph data={graphData} />}
          />
        ) : (
          <p>You haven&apos;t created any baskets yet!</p>
        )}
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {isInvestedBasketsLoading || userInvestedBaskets?.length ? (
          <BasketList
            baskets={userInvestedBaskets}
            isLoading={false}
            showDescription
          />
        ) : (
          <p>You haven&apos;t invested in any baskets yet!</p>
        )}
      </TabPanel>
    </Box>
  );
};

export default YourPortfolio;
