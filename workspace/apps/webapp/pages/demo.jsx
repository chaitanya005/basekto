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
            DEFI Basket
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

        <Typography>
          Web3 enables a new data economy. The Web3 data economy is an ecosystem
          of data-centric protocols and applications disrupting the data
          monopolies built in Big Tech. DATA provides exposure to the growth of
          the Web3 data economy in a single token.
        </Typography>
      </Box>
    </Container>
  );
};

export default Demo;
