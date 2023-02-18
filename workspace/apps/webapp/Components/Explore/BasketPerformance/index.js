import { Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const BasketPerformance = (props) => {
  const { title, color, arrowDirection, timeFrame, value } = props;

  return (
    <>
      <Card
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 'none',
          minWidth: '165px',
        }}
      >
        <CardContent sx={{ paddingBottom: '12px !important', padding: '8px' }}>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption">{title}</Typography>
          </Grid>
          <Typography
            sx={{ textAlign: 'center', mt: 1.5, fontSize: '2rem' }}
            variant="h4"
            color={color}
          >
            {value !== 'NaN' && value !== 'undefined%' ? (
              <>
                {value}
                <ArrowDownwardIcon
                  sx={{
                    height: '1.6rem',
                    transform: arrowDirection,
                  }}
                />
              </>
            ) : (
              'No Info'
            )}
          </Typography>
          <Typography variant="body2" textAlign={'right'} fontSize="12px">
            {timeFrame}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default BasketPerformance;
