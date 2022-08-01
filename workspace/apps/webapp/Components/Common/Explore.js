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
        <Grid container justifyContent={'space-between'}>
          <Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#777',
                }}
              >
                Token
              </Typography>
            </Grid>
          </Grid>

          <Grid justifyContent={'space-between'} display="flex" gap="5rem">
            {showDetails && (
              <>
                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#777',
                    }}
                  >
                    Price
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#777',
                    }}
                  >
                    Growth Rate {'(100%)'}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#777',
                    }}
                  >
                    Growth Rate
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#777',
                }}
              >
                Weight {'(%)'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 1, mb: 1.5 }} />

        {(isLoading || isFetching ? Array.from({ length: 3 }) : coins)?.map(
          (coin, i) => (
            <Grid container key={i} justifyContent={'space-between'}>
              <Grid>
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 2, maxWidth: '500px' }}
                >
                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="circular"
                      sx={{ width: 28, height: 28 }}
                      animation="wave"
                    />
                  ) : (
                    <Avatar
                      src={coin?.img}
                      alt={coin?.name + ' logo'}
                      sx={{ mr: 2.5, width: 28, height: 28 }}
                    />
                  )}

                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="text"
                      sx={{ width: '60px', ml: '20px' }}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {coin.name}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Grid
                justifyContent={'space-between'}
                display="flex"
                gap="8.5rem"
              >
                {showDetails && (
                  <>
                    <Grid item>
                      {isLoading || isFetching ? (
                        <Skeleton
                          variant="text"
                          sx={{ width: '30px' }}
                          animation="wave"
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}
                        >
                          $ {coin?.price}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item>
                      {isLoading || isFetching ? (
                        <Skeleton
                          variant="text"
                          sx={{ width: '30px' }}
                          animation="wave"
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}
                        >
                          {coin?.growthRate?.toFixed(2)}%
                        </Typography>
                      )}
                    </Grid>

                    <Grid item>
                      {isLoading || isFetching ? (
                        <Skeleton
                          variant="text"
                          sx={{ width: '30px' }}
                          animation="wave"
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}
                        >
                          {coin?.withWeight?.toFixed(2)}%
                        </Typography>
                      )}
                    </Grid>
                  </>
                )}

                <Grid item>
                  {isLoading || isFetching ? (
                    <Skeleton
                      variant="text"
                      sx={{ width: '30px' }}
                      animation="wave"
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {coin?.weight.toFixed(2)}%
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )
        )}
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
