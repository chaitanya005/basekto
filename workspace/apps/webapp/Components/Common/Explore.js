import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Graph from './Graph';
import {
  Alert,
  IconButton,
  InputAdornment,
  Skeleton,
  Snackbar,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import InvestReturns from '../Explore/InvestmentReturns';
import TokensTable from '../Explore/TokensTable';
import DialogBox from './DialogBox';
import BasketInvest from '../Explore/BasketInvest';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ShareIcon from '@mui/icons-material/Share';
// import BasketShareDialog from './BasketShareDialog';
import BasketShareDialog from '../Explore/BasketInvest/BasketShareDialog';

import parse from 'html-react-parser';

const Explore = ({
  basket,
  showDetails,
  isLoading,
  isFetching,
  graphData,
  setDays,
  coins,
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
                  disabled={isLoading || isFetching}
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
                      // onClick={}
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
        <Graph data={graphData} setDays={setDays} />
      </Box>

      <Box sx={{ mb: 6, mt: 6 }}>
        <TokensTable
          tokensData={coins}
          showDetails={showDetails}
          isLoading={isLoading}
        />
      </Box>

      {/* {showDetails && (
        <Box sx={{ mb: 4 }}>
          <InvestReturns />
        </Box>
      )} */}

      <Box>
        <Typography variant="h5">About</Typography>

        <Divider sx={{ mt: 1, mb: 1 }} />

        {isLoading || isFetching ? (
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
