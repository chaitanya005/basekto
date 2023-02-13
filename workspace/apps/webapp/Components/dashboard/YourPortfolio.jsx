import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoRounded from '@mui/icons-material/InfoRounded';
import BasketList from '../Common/BasketList';
import { getCreatedBaskets, getInvestedBaskets } from '@basketo/web-utils';
import CommonTabs from '../Common/CommonTabs';
import AlertBox from '../Common/AlertBox';

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
      <Box sx={{ mt: '20px' }}>
        <AlertBox alert={alert} setAlert={setAlert} />

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

        <CommonTabs
          tabIndex={tabIndex}
          tabLabels={['Created Baskets', 'Invested Baskets']}
          handleChange={handleChange}
          variant={sm ? 'fullWidth' : 'standard'}
          tabPanels={[
            userCreatedBaskets?.baskets?.length ? (
              <BasketList
                basketsData={userCreatedBaskets?.baskets}
                isLoading={isLoading}
                showGrowth
                showDescription
                showGraph
              />
            ) : (
              <p>You haven&apos;t created any baskets yet!</p>
            ),
            userInvestedBaskets?.baskets?.length ? (
              <BasketList
                basketsData={userInvestedBaskets?.baskets}
                isLoading={isLoading}
                showDescription
                showGraph
              />
            ) : (
              <p>You haven&apos;t invested in any baskets yet!</p>
            ),
          ]}
        />
      </Box>
    </>
  );
};

export default YourPortfolio;
