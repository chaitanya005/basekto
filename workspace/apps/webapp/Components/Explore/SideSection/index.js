import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import BasketInvest from '../BasketInvest';
import BasketPerformance from '../BasketPerformance';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

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
  } = props;

  return (
    <>
      <Grid
        sx={{
          position: 'sticky',
          top: '90px',
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'row',
            mb: 2.5,
            gap: 1.5,
          }}
        >
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
          <BasketPerformance
            title={
              investments?.[0] ? 'Your Positions' : "You haven't invested yet!"
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
            value={`${(
              investments?.[0]?.totalAmount +
              graphDataWithGrowthRates?.growthRateOfbasket
            ).toFixed(2)}`}
          />
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
      </Grid>
    </>
  );
};

export default SideSection;
