import {
  Avatar,
  Card,
  Chip,
  Typography,
  Button,
  CardContent,
  AvatarGroup,
} from '@mui/material';
import { Box } from '@mui/system';
import { deepOrange, deepPurple, deepGreen } from '@mui/material/colors';

//this is a presentational component for an individual basket card
//TODO: implement graph component

export function BasketCard({
  sx, // Styling
  data, // Object {title, symbol, growth:{percent, period}, basketeer, graphData, description, coins}
  showGrowth, // Boolean
  showDescription, // Boolean
  showGraph, // Boolean
  hideChip,
  showFollow,
  ...props
}) {
  // To remove all tags from data
  const RemoveHTMLTags = (html) => {
    var regX = /(<([^>]+)>)/gi;
    if (html.replace(regX, '').length > 120)
      return html.replace(regX, '').slice(0, 120).concat('...');
    return html.replace(regX, '').slice(0, 120);
  };

  const avatarColors = ['#637bfe', '#00e676', '#00b0ff', '#ff3d00', '#00e5ff'];

  const stringAvatar = (bsktSymbol) => {
    const randomColor = Math.floor(Math.random() * avatarColors.length);
    return {
      sx: {
        width: '3rem',
        height: '3rem',
        gridColumn: '1/2',
        gridRow: '1/3',
        alignSelf: 'center',
        justifySelf: 'center',
        bgcolor: avatarColors[randomColor],
        fontSize: '18px',
      },
      children: `${bsktSymbol.split(' ')[0][0]}${bsktSymbol.split(' ')[0][1]}`,
    };
  };

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-Between',
        ...sx,
      }}
      // variant="outlined"
      {...props}
    >
      <Box
        sx={{
          padding: '15px 20px 10px 12px',
        }}
      >
        <CardContent
          sx={{
            '&:last-child': {
              padding: 0,
            },
          }}
        >
          <Typography
            sx={{
              display: 'grid',
              gridTemplateColumns: '3.1rem 1fr auto',
              gridTemplateRows: 'auto auto',
              columnGap: '5px',
            }}
            variant="h6"
          >
            <Avatar {...stringAvatar(data?.symbol?.toUpperCase())} />
            {(data?.title.length > 15
              ? data.title.slice(0, 15).concat('...')
              : data.title) || 'No title'}
            {showFollow && (
              <Button
                sx={{
                  width: '27%',
                  height: 27,
                  marginLeft: 'auto',
                  fontSize: '13px',
                  alignSelf: 'center', //self-end
                }}
                variant="contained"
              >
                Follow
              </Button>
            )}
            {showGrowth && (
              <Typography
                variant="caption"
                sx={{
                  color: 'secondary.main',
                  fontWeight: '400',
                  gridColumn: '2/4',
                  gridRow: '2/3',
                }}
              >
                {data?.symbol || 'SYMBOL'} |{' '}
                {!hideChip && (
                  <Chip
                    label={data?.basketGrowth?.toFixed(2) + '%'}
                    sx={{
                      margin: '0px 2px',

                      height: '1rem',
                      background: `${
                        data?.basketGrowth >= 0 ? '#32D583' : '#F04438'
                      }`,
                      color: '#fff',
                      fontWeight: 600,
                      borderRadius: '0.4rem',
                      '& .MuiChip-label': {
                        p: '0.25rem 0.5rem',
                      },
                      maxWidth: 'fit-content',
                    }}
                  />
                )}
              </Typography>
            )}
          </Typography>
        </CardContent>
      </Box>

      {showDescription && (
        <>
          <Typography sx={{ margin: '10px 20px', fontSize: '14px' }}>
            {data?.description && RemoveHTMLTags(data?.description)}
          </Typography>
        </>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px',
          gap: '0.5rem',
        }}
      >
        <Avatar sx={{ width: '1.3em', height: '1.3em' }} />
        <Typography>
          {data?.basketeer?.slice(0, 4) || 'Basketeer'}...
          {data?.basketeer?.slice(34, 42)}
        </Typography>

        <AvatarGroup
          sx={{ justifyContent: 'center', marginLeft: 'auto' }}
          max={3}
        >
          {data?.coins?.map((coin) => (
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              alt={coin?.symbol}
              src={coin?.img}
            />
          ))}
        </AvatarGroup>
      </Box>
    </Card>
  );
}
export default BasketCard;
