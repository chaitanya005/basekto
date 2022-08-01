import {
  Avatar,
  Card,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

//this is a presentational component for an individual basket card
//TODO: implement graph component

export function BasketCard({
  sx, // Styling
  data, // Object {title, symbol, growth:{percent, period}, basketeer, graphData, description}
  showGrowth, // Boolean
  showDescription, // Boolean
  showGraph, // Boolean
  hideChip,
  ...props
}) {
  return (
    <Card
      sx={{
        maxWidth: '400px',
        minWidth: '250px',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: '200ms',
        border: 'none',
        '&:hover': {
          borderColor: 'secondary.main',
          transform: 'translate(0px,-1.5px)',
        },
        boxShadow:
          'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        ...sx,
      }}
      variant="outlined"
      {...props}
    >
      <Box sx={{ padding: '15px 20px 10px 20px' }}>
        <Typography variant="h6">{data?.title || 'No title'}</Typography>

        {showGrowth && (
          <Typography
            variant="caption"
            sx={{ color: 'secondary.main', fontWeight: '400' }}
          >
            {data?.symbol || 'SYMBOL'}&nbsp;|&nbsp;
            <Typography
              component={'span'}
              variant="caption"
              sx={{
                color:
                  data?.growth?.percent[0] === '+'
                    ? 'success.main'
                    : 'error.main',
              }}
            >
              {data?.growth?.percent || '0'}%
            </Typography>
            &nbsp;in the past {data?.growth?.period || 'period'}
          </Typography>
        )}
      </Box>
      {showDescription && (
        <>
          <Typography sx={{ margin: '10px 20px', fontSize: '14px' }}>
            {data?.description}
          </Typography>
        </>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px 20px' }}>
        <Avatar sx={{ width: '1.3em', height: '1.3em' }} />
        &nbsp;&nbsp;
        <Typography>
          {data?.basketeer.slice(0, 4) || 'Basketeer'}...
          {data?.basketeer.slice(34, 42)}
        </Typography>
      </Box>
      {!hideChip && (
        <Chip
          label={data?.basketGrowth?.toFixed(2) + '%'}
          sx={{
            margin: '15px 20px',
            mt: 2,
            height: 'auto',
            background: `${data?.basketGrowth >= 0 ? '#32D583' : '#F04438'}`,
            color: '#fff',
            fontWeight: 600,
            borderRadius: '0.4rem',
            '& .MuiChip-label': {
              p: '0.25rem 0.5rem',
            },
          }}
        />
      )}
    </Card>
  );
}
export default BasketCard;
