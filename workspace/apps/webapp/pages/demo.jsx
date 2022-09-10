import { Avatar, Button, Divider, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { demoData, basketData } from '../demoData';
import BasicModal from '../Components/Modal';
import { useState } from 'react';

const Demo = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <BasicModal open={open} setOpen={setOpen} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 4, mb: 4 }}
      >
        <Box display="flex" alignItems="center" sx={{ '> *': { mr: 2 } }}>
          <Avatar
            src={'default img'}
            alt={' logo'}
            sx={{ width: 48, height: 48 }}
          />

          <Typography
            variant="h3"
            sx={{ fontSize: '2rem', fontWeight: 'bold' }}
          >
            Web3
          </Typography>
        </Box>
        <Box display={'flex'} gap={'2rem'}>
          <Button
            variant="contained"
            sx={{ width: '8em', fontSize: '18px' }}
            onClick={() => setOpen(true)}
          >
            Invest
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <ResponsiveContainer
          width="100%"
          height="auto"
          aspect={sm ? 1.25 : 2.25}
        >
          <LineChart
            width={500}
            height={300}
            data={demoData}
            margin={{
              left: sm ? -24 : -16,
            }}
            style={{
              fontSize: 'clamp(0.75rem, 0.6rem + 1vw, 1rem)',
            }}
          >
            <XAxis dataKey="timeStamp" />
            <YAxis />
            <Tooltip />
            <Line
              dot={false}
              type="monotone"
              dataKey="point"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
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

        {basketData.map((coin) => (
          <Grid container justifyContent={'space-between'} key={coin.id}>
            <Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                sx={{ mb: 2, maxWidth: '500px' }}
              >
                <Avatar
                  src={coin?.img}
                  alt={' logo'}
                  sx={{ mr: 2.5, width: 28, height: 28 }}
                />

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
              </Grid>
            </Grid>
            <Grid justifyContent={'space-between'} display="flex" gap="8.5rem">
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  ${coin.price}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {coin.growthRate}%
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {coin.withWeight}%
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {coin.weight}%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box>
        <Typography variant="h5">About</Typography>

        <Divider sx={{ mt: 1, mb: 1 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Token Inclusion Criteria
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              Data-based Protocol:
            </Typography>
            The protocol provides data-based services or products.
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              Ethereum Token:
            </Typography>
            The token must be available on the Ethereum blockchain. This will be revised if the Basketo Protocol infrastructure becomes multi-chain.
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              Organic Network Activity or Usage:
            </Typography>
            Protocol must have organic network activity or usage. On-chain transaction volume, Total Value Locked (TVL), and/or revenue paid to service providers are all examples of metrics that can be used to demonstrate organic network activity.
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              Market Capitalization:
            </Typography>
            Circulating market capitalization must be over $100m. Decentralized Exchange (DEX) Liquidity: Protocol token must have sufficient DEX liquidity to support inclusion. If a token has insufficient liquidity, it will be removed from the basket during the determination phase.
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              History:
            </Typography>
            Protocol must have at least 3 months history of operation and its token must have at least 3 months of price and liquidity history.
          </Typography>

          <Typography gutterBottom>
            <Typography fontWeight="600">
              Security:
            </Typography>
            An independent security audit should have been performed on the protocol and results reviewed by the product methodologist. In the case that no audit has been performed, the methodologist applies subjective judgement of the protocol based on assessment of the criteria above and communications with the team.
          </Typography>
        </Box>

        <Typography
          marginTop={ 1 }
          fontStyle="italic"
          textAlign="right"
        >
          Created by Alice
        </Typography>
      </Box>
    </Container>
  );
};

export default Demo;
