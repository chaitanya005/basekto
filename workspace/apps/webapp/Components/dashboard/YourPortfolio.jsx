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


function TabPanel({ children, value, index, ...other }) {

  return (

    <Box sx={{ mt: 4, mb: 8 }}
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${ index }` }
      aria-labelledby={ `simple-tab-${ index }` }
      { ...other }
    >
      { value === index && children }
    </Box>
  );
}

const YourPortfolio = ({ userAddress }) => {

  const sm = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createdBaskets, setCreatedBaskets] = useState(null);
  const investedBaskets = [];

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {

    setIsLoading(true);

    function fetchData() {

      axios.get(
          `${ process.env.NEXT_PUBLIC_BACKEND_API }/baskets/${ userAddress }`
        ).then((basketData) => {
          setCreatedBaskets(basketData.data);
        }).catch((e) => {
          setCreatedBaskets(null);
          console.log(e);
        }).finally(() =>
          setIsLoading(false)
        );
    }
    userAddress && fetchData();
  }, [userAddress]);

  return (

    <Box sx={{ mt: '20px' }}>
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
          borderColor: 'divider'
        }}
      >
        <Tabs
          variant={ sm ? 'fullWidth' : 'standard' }
          value={ tabIndex }
          onChange={ handleChange }
        >
          <Tab label="Created Baskets" />
          <Tab label="Invested Baskets" />
        </Tabs>
      </Box>

      <TabPanel value={ tabIndex } index={0}>
        { isLoading || createdBaskets?.length ? (
            <BasketList
              baskets={ createdBaskets }
              isLoading={ isLoading }
              showGrowth
              showGraph
              graph={
                <MiniGraph data={ graphData } />
              }
            />
        ) : (
          <p>You haven&apos;t created any baskets yet!</p>
        )}
      </TabPanel>

      <TabPanel value={ tabIndex } index={1}>
        { investedBaskets?.length ? (
            <BasketList
              baskets={ investedBaskets }
              isLoading={ false }
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
