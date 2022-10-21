import {
  Avatar,
  Card,
  CardHeader,
  Chip,
  Divider,
  Typography,
  CardMedia,
  Button,
  CardContent,
  AvatarGroup,
} from '@mui/material';
import { Box } from '@mui/system';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const parse = require('html-react-parser');
import styled from '@emotion/styled';
//this is a presentational component for an individual basket card
//TODO: implement graph component

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: false,
};

const QuillNoSSRWrap = styled(QuillNoSSRWrapper)`
  .ql-container {
    font-family: inherit;
    border: none !important;
  }
`;
export function BasketCard({
  sx, // Styling
  data, // Object {title, symbol, growth:{percent, period}, basketeer, graphData, description}
  showGrowth, // Boolean
  showDescription, // Boolean
  showGraph, // Boolean
  hideChip,
  showFollow,
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
            <Avatar
              sx={{
                width: '3rem',
                height: '3rem',
                gridColumn: '1/2',
                gridRow: '1/3',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
              alt="web-3 Icon"
              src="https://set-core.s3.amazonaws.com/img/coin-icons/usdc.svg"
            />
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
          </Typography>
        </CardContent>
      </Box>
      {showDescription && (
        <>
          <Typography sx={{ margin: '10px 20px', fontSize: '14px' }}>
            <QuillNoSSRWrap
              value={data?.description?.slice(0, 120).concat('...')}
              modules={modules}
              style={{ fontFamily: 'inherit' }}
              readOnly={true}
              theme={'bubble'}
            />
          </Typography>
        </>
      )}
      <AvatarGroup sx={{ justifyContent: 'center' }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
          }}
          alt="Remy Sharp"
          src="https://assets.coingecko.com/coins/images/15453/small/ujenny.png?1620870247"
        />
        <Avatar
          sx={{
            width: 30,
            height: 30,
          }}
          alt="Travis Howard"
          src="https://assets.coingecko.com/coins/images/15810/small/gitcoin.png?1621992929"
        />
        <Avatar
          sx={{
            width: 30,
            height: 30,
          }}
          alt="Cindy Baker"
          src="https://s3.amazonaws.com/set-core/img/coin-icons/dai.svg"
        />
      </AvatarGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px 20px' }}>
        <Avatar sx={{ width: '1.3em', height: '1.3em' }} />
        &nbsp;&nbsp;
        <Typography>
          {data?.basketeer?.slice(0, 4) || 'Basketeer'}...
          {data?.basketeer?.slice(34, 42)}
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
            maxWidth: 'fit-content',
          }}
        />
      )}
    </Card>
  );
}
export default BasketCard;
