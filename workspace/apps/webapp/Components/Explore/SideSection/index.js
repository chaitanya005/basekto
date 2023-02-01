import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import BasketInvest from '../BasketInvest';
import BasketPerformance from '../BasketPerformance';
import { Skeleton } from '@mui/material';

const SideSection = (props) => {
  const {
    graphDataWithGrowthRates,
    investments,
    timeFrame,
    tokens,
    amount,
    setAmount,
    basket,
    handleStoreInvest,
    userAddress,
    handlePublish,
    isFetching,
  } = props;

  const handleTotalPositions = () => {
    const totalPositions =
      (graphDataWithGrowthRates?.growthRateOfbasket / 100) *
        investments?.[0]?.totalAmount +
      investments?.[0]?.totalAmount;

    return totalPositions.toPrecision(1);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '90px',
      }}
    >
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid item xs={12} lg={6}>
          {isFetching ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: 150, height: 100 }}
              animation="wave"
            />
          ) : (
            <BasketPerformance
              title={'Basket Growth'}
              color={
                graphDataWithGrowthRates?.growthRateOfbasket >= 0
                  ? 'green'
                  : 'red'
              }
              arrowDirection={
                graphDataWithGrowthRates?.growthRateOfbasket >= 0
                  ? 'rotate(180deg)'
                  : 'rotate(360deg)'
              }
              timeFrame={timeFrame}
              value={`${graphDataWithGrowthRates?.growthRateOfbasket.toFixed(
                2
              )}%`}
            />
          )}
        </Grid>

        <Grid item xs={12} lg={6}>
          {isFetching ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: 150, height: 100 }}
              animation="wave"
            />
          ) : (
            <BasketPerformance
              title={
                investments?.[0]
                  ? 'Your Positions'
                  : "You haven't invested yet!"
              }
              color={
                investments?.[0]
                  ? graphDataWithGrowthRates?.growthRateOfbasket >= 0
                    ? 'green'
                    : 'red'
                  : 'secondary'
              }
              arrowDirection={
                graphDataWithGrowthRates?.growthRateOfbasket >= 0
                  ? 'rotate(180deg)'
                  : 'rotate(360deg)'
              }
              timeFrame={timeFrame}
              value={`${handleTotalPositions()}`}
            />
          )}
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          padding: '2rem 1rem 2.5rem',
        }}
      >
        <Grid>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Invest in Basket
          </Typography>

          <BasketInvest
            tokensData={tokens}
            amount={amount}
            setAmount={setAmount}
          />

          <Button
            variant="contained"
            onClick={handleStoreInvest}
            fullWidth
            disabled={amount ? false : true}
          >
            Invest
          </Button>

          {basket?.accountId === userAddress && !basket.publishedBasket && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<PublishedWithChangesIcon />}
              onClick={handlePublish}
            >
              Publish This Basket
            </Button>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SideSection;
