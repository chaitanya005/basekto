import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import Graph from './Graph';
import DialogBox from './DialogBox';
import BasketInvest from '../Explore/BasketInvest';
import BasketShareDialog from '../Explore/BasketInvest/BasketShareDialog';
// import InvestReturns from '../Explore/InvestmentReturns';
import TokensTable from '../Explore/TokensTable';
import Investments from '../Explore/Investments';

const Explore = ({
  basket,
  showDetails,
  isLoading,
  graphDataWithGrowthRates,
  isGraphLoading,
  setDays,
  coins,
  isCoinsDataLoading,
  handleStoreInvest,
  days,
  investments,
}) => {
  const mdDown = useMediaQuery(useTheme().breakpoints.down('md'));

  const [alertSnackbarOpen, setAlertSnackbarOpen] = useState(false);
  const handleAlertSnackbarClose = () => setAlertSnackbarOpen(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    setGraphData(graphDataWithGrowthRates);
  }, [graphDataWithGrowthRates, days]);

  return (
    <>
      <Snackbar
        open={alertSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleAlertSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAlertSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your Input has been saved!
        </Alert>
      </Snackbar>

      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        sx={{
          mt: 4,
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'flex-start' },
        }}
      >
        <Box display="flex" alignItems="center" sx={{ '> *': { mr: 2 } }}>
          {isLoading ? (
            <Skeleton
              variant="circular"
              sx={{ width: 48, height: 48 }}
              animation="wave"
            />
          ) : (
            <Avatar
              src={basket?.image || 'default img'}
              alt={basket?.symbol + ' logo'}
              sx={{ width: 48, height: 48 }}
            />
          )}

          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: '90px', height: '20px' }}
            />
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontSize: 'clamp(1.25rem, 1.25rem + 0.75vw, 1.75rem)',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {basket?.name}
            </Typography>
          )}
        </Box>

        {showDetails && (
          <Box display="flex" alignItems="center" gap={1}>
            {mdDown && (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setInvestDialogOpen(true)}
                  disabled={isLoading}
                  sx={{
                    width: { sm: '8em' },
                    fontSize: '1.125rem',
                  }}
                >
                  Invest
                </Button>

                <DialogBox
                  title={
                    <Typography variant="h5" component="div" textAlign="center">
                      Invest in Basket
                    </Typography>
                  }
                  open={investDialogOpen}
                  onClose={() => setInvestDialogOpen(false)}
                  actions={
                    <Button
                      variant="contained"
                      onClick={handleStoreInvest}
                      fullWidth
                    >
                      Continue
                    </Button>
                  }
                >
                  <BasketInvest tokensData={coins} />
                </DialogBox>
              </>
            )}

            <Box display="flex" justifyContent="end" marginBottom={3}>
              <Button
                sx={{ paddingRight: '5px' }}
                onClick={handleClickOpen}
                startIcon={<ShareIcon />}
              />

              <BasketShareDialog open={dialogOpen} setOpen={setDialogOpen} />
            </Box>

            <DialogBox
              title="Alert Me"
              open={alertDialogOpen}
              onClose={() => setAlertDialogOpen(false)}
            >
              <TextField
                variant="outlined"
                color="primary"
                placeholder="Enter limit"
                autoFocus
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setAlertSnackbarOpen(true);
                          setAlertDialogOpen(false);
                        }}
                      >
                        Alert Me!
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogBox>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Graph
          data={graphData}
          setDays={setDays}
          totalAmount={investments?.[0]?.totalAmount}
          isLoading={isGraphLoading}
        />
      </Box>

      <Box sx={{ mb: 6, mt: 6 }}>
        <TokensTable
          tokensData={coins}
          showDetails={showDetails}
          isLoading={isCoinsDataLoading}
        />
      </Box>

      {investments?.[0]?.invested_basket && (
        <Box sx={{ mb: 2 }}>
          <Investments investments={investments?.[0]?.invested_basket} />
        </Box>
      )}

      {/* {showDetails && (
        <Box sx={{ mb: 4 }}>
          <InvestReturns />
        </Box>
      )} */}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">About</Typography>

        <Divider sx={{ mt: 1, mb: 1 }} />

        {isLoading ? (
          <>
            <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
            <Skeleton animation="wave" variant="text" sx={{ width: '70%' }} />
          </>
        ) : (
          // <Typography>{basket?.description}</Typography>

          <div className="ql-snow">
            <div className="ql-editor" data-gramm="false">
              {basket?.description && parse(basket?.description)}
            </div>
          </div>
        )}
      </Box>
    </>
  );
};

export default Explore;
