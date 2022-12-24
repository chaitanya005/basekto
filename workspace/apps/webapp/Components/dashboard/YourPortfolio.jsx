import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoRounded from '@mui/icons-material/InfoRounded';
import BasketList from '../Common/BasketList';


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

const YourPortfolio = ({ createdBaskets, investedBaskets, isLoading }) => {

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          value={ value }
          onChange={ handleChange }
        >
          <Tab label="Created Baskets" />
          <Tab label="Invested Baskets" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        { isLoading || createdBaskets?.length ? (
            <BasketList
              baskets={ createdBaskets }
              isLoading={ isLoading }
              showDescription
            />
        ) : (
          <p>You haven&apos;t created any baskets yet!</p>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
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
