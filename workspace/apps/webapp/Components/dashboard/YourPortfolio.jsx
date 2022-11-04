import { Box, Typography, Tooltip } from '@mui/material';
import { BasketCard } from '@basketo/web-ui';
import { InfoRounded } from '@mui/icons-material';

const YourPortfolio = ({ basketData, showPortfolioBaskets }) => {
  return (
    <Box sx={{ marginTop: '20px' }}>
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
          display: 'grid',
          width: '100%',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {showPortfolioBaskets ? (
          <BasketCard
            key={basketData?._id}
            data={{
              title: basketData?.name,
              symbol: basketData?.symbol,
              growth: { percent: '+0.01', period: 'week' },
              basketeer: basketData?.accountId,
              description: basketData?.description,
              coins: basketData?.coins,
            }}
            showDescription
            hideChip
            //showGrowth
          />
        ) : (
          <p>No baskets yet!</p>
        )}
      </Box>
    </Box>
  );
};

export default YourPortfolio;
