import { useEffect, useState } from 'react';
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
import Overview from './Overview';

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

const YourPortfolio = ({ userAddress, showEdit }) => {
  const sm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const [tabIndex, setTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const [userCreatedBaskets, setUserCreatedBaskets] = useState([]);
  const [userInvestedBaskets, setUserInvestedBaskets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    async function getUserBaskets() {
      setIsLoading(true);
      try {
        const [userCreatedBaskets, userInvestedBaskets] = await Promise.all([
          getCreatedBaskets(userAddress),
          getInvestedBaskets(userAddress),
        ]);
        setUserCreatedBaskets(userCreatedBaskets);
        setUserInvestedBaskets(userInvestedBaskets);
      } catch (error) {
        console.log(error);
        setAlert({
          open: true,
          severity: 'error',
          message: 'Something went wrong.',
        });
      }
      setIsLoading(false);
    }
    getUserBaskets();
  }, []);

  return (
    <>
      {/* <Overview /> */}
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
          {userCreatedBaskets?.baskets?.length ? (
            <BasketList
              basketsData={userCreatedBaskets?.baskets}
              isLoading={isLoading}
              showGrowth
              showDescription
              // showGraph
              graph={<MiniGraph data={graphData} />}
            />
          ) : (
            <p>You haven&apos;t created any baskets yet!</p>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          {userInvestedBaskets?.length ? (
            <BasketList
              basketsData={userInvestedBaskets}
              isLoading={isLoading}
              showDescription
            />
          ) : (
            <p>You haven&apos;t invested in any baskets yet!</p>
          )}
        </TabPanel>
      </Box>
    </>
  );
};

export default YourPortfolio;
