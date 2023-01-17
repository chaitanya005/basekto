import { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import moment from 'moment';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TimeFrameBtns from './TimeFrameBtns';

const timeFrames = { '1D': 1, '1W': 7, '1M': 30, '1Y': 365 };

const Graph = ({ data, setDays, isLoading, totalAmount }) => {
  const theme = useTheme();
  const aspect = useMediaQuery(theme.breakpoints.down('sm')) ? 1.25 : 2.25;

  const skeletonRef = useRef(null);
  const [skeletonHeight, setSkeletonHeight] = useState('0px');

  const [timeFrame, setTimeFrame] = useState(Object.keys(timeFrames)[0]);
  const [activeValue, setActiveValue] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [lastValue, setLastValue] = useState('');
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    setDays(timeFrames[timeFrame]);
  }, [setDays, timeFrame]);

  useEffect(() => {
    setSkeletonHeight(skeletonRef.current?.offsetWidth / aspect + 'px');
  }, [aspect, isLoading]);

  useEffect(() => {
    const timeStamp = data?.[data?.length - 1]?.timeStamp;
    setFirstValue(data?.[0]?.['Growth Rate']);
    setLastValue(data?.[data?.length - 1]?.['Growth Rate']);
    setLastDate(moment(timeStamp).format('MMM Do YY - hh:mm a'));
  }, [data]);

  const CustomizedToolTip = (props) => {
    const { active, payload } = props;
    const growthRate = payload?.[0]?.payload['Growth Rate'];
    const timeStamp = payload?.[0]?.payload?.timeStamp;
    if (active) {
      setActiveValue(growthRate);
      setActiveDate(moment(timeStamp).format('MMM Do YY - hh:mm a'));
    } else {
      setActiveValue('');
      setActiveDate('');
    }
  };

  const handleCurrentValue = (value) => {
    const currentValue = (value / 100) * 1000 + 1000;
    return currentValue.toFixed(2);
  };

  return isLoading ? (
    <Skeleton
      ref={skeletonRef}
      variant="rectangular"
      animation="wave"
      sx={{
        width: '100%',
        height: skeletonHeight,
        borderRadius: '1rem',
      }}
    />
  ) : (
    <Card
      sx={{
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        borderRadius: '10px',
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Grid item xs={12} sm={8}>
            <Box
              color={firstValue <= lastValue ? 'green' : 'red'}
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                fontSize="clamp(1rem, 0.9rem + 0.5vw, 1.25rem)"
              >
                Current value of $1000 invested is $
                {activeValue ? (
                  <>{handleCurrentValue(activeValue)}</>
                ) : (
                  <>{handleCurrentValue(lastValue)}</>
                )}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}
              >
                <b>
                  {activeValue ? (
                    activeValue.toFixed(2)
                  ) : (
                    <>{parseFloat(parseFloat(lastValue)?.toFixed(2))}</>
                  )}
                  %
                </b>{' '}
                <Typography color="secondary" variant="caption">
                  at {activeDate ? <>{activeDate}</> : <>{lastDate}</>}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <TimeFrameBtns
                value={timeFrame}
                setValue={setTimeFrame}
                timeFrames={timeFrames}
                totalAmount={totalAmount}
                size="small"
                color="primary"
                btnStyles={{
                  p: '0.2rem 0.4rem',
                  fontWeight: 'bold',
                }}
                btnGroupStyles={{
                  display: 'flex',
                  height: '40px',
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <ResponsiveContainer width="100%" height="auto" aspect={aspect}>
          <LineChart
            width={500}
            height={300}
            data={data}
            style={{
              fontSize: 'clamp(0.75rem, 0.6rem + 1vw, 1rem)',
            }}
          >
            <XAxis hide={true} dataKey="timeStamp" />
            <YAxis hide={true} domain={['auto', 'auto']} tickCount={4} />
            <CartesianGrid strokeDasharray="3" vertical={true} />
            <Tooltip content={<CustomizedToolTip />} />
            {firstValue <= lastValue ? (
              <Legend
                verticalAlign={'bottom'}
                payload={[
                  {
                    dataKey: 'Growth Rate',
                    value: 'Performance of Basket',
                    color: 'green',
                    type: 'line',
                  },
                ]}
              />
            ) : (
              <Legend
                verticalAlign={'bottom'}
                payload={[
                  {
                    dataKey: 'Growth Rate',
                    value: 'Performance of Basket',
                    color: 'red',
                    type: 'line',
                  },
                ]}
              />
            )}
            <Line
              dot={false}
              type="monotone"
              dataKey="Growth Rate"
              stroke={firstValue <= lastValue ? 'green' : 'red'}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <style>{`
          .recharts-legend-wrapper {
            bottom: -10px !important;
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default Graph;
