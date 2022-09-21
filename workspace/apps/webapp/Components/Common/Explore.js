import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Graph from './Graph';
import {
  Alert,
  InputAdornment,
  Skeleton,
  Snackbar,
  TextField,
  Tooltip,
} from '@mui/material';
import InvestReturns from '../Explore/InvestmentReturns';
import { useState } from 'react';
import TokensTable from '../Explore/TokensTable';

const Explore = ({
  basket,
  showDetails,
  isLoading,
  isFetching,
  graphData,
  setDays,
  coins,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your Input has been saved!
        </Alert>
      </Snackbar>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={ 3 }
        sx={{ mt: 4, mb: 4 }}
      >
        <Box display="flex" alignItems="center" sx={{ '> *': { mr: 2 } }}>
          {isLoading || isFetching ? (
            <Skeleton
              variant="circular"
              sx={{ width: 48, height: 48 }}
              animation="wave"
            />
          ) : (
            <Avatar
              src={basket?.image ?? 'default img'}
              alt={basket?.symbol + ' logo'}
              sx={{ width: 48, height: 48 }}
            />
          )}

          {isLoading || isFetching ? (
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: '90px', height: '20px' }}
            />
          ) : (
            <Typography
              variant="h3"
              sx={{ fontSize: '2rem', fontWeight: 'bold' }}
            >
              {basket?.name}
            </Typography>
          )}
        </Box>
        {showDetails && (
          <Box display={'flex'} gap={'2rem'}>
            <Box>
              <TextField
                variant="outlined"
                color="primary"
                placeholder="Enter limit"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button variant="contained" onClick={() => setOpen(true)}>
                        Alert Me!
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Tooltip title="Coming soon!">
              <Button
                variant="contained"
                sx={{ width: '8em', fontSize: '18px' }}
              >
                Invest
              </Button>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Graph data={graphData} setDays={setDays} />
      </Box>

      <Box sx={{ mb: 6, mt: 6 }}>
        <TokensTable
          tokensData={ coins }
          showDetails={ showDetails }
          isLoading={ isLoading }
        />
      </Box>

      {showDetails && (
        <Box sx={{ mb: 4 }}>
          <InvestReturns />
        </Box>
      )}

      <Box>
        <Typography variant="h5">About</Typography>

        <Divider sx={{ mt: 1, mb: 1 }} />

        {isLoading || isFetching ? (
          <>
            <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
            <Skeleton animation="wave" variant="text" sx={{ width: '70%' }} />
          </>
        ) : (
          <Typography>{basket?.description}</Typography>
        )}
      </Box>
    </>
  );
};

export default Explore;
