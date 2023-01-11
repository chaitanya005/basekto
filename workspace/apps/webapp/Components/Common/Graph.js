import { useState, useEffect, useRef } from 'react';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
import TimeFrameBtns from './TimeFrameBtns';
import { Box, Grid, Typography } from '@mui/material';

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
    setFirstValue(data?.[0]?.['Growth Rate']);
    setLastValue(data?.[data?.length - 1]?.['Growth Rate']);
    setLastDate(data?.[data?.length - 1]?.timeStamp);
  }, [data]);

  const CustomizedToolTip = (props) => {
    const { active, payload } = props;
    if (active) {
      setActiveValue(payload?.[0]?.payload['Growth Rate']);
      setActiveDate(payload?.[0]?.payload.timeStamp);
    } else {
      setActiveValue('');
      setActiveDate('');
    }
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
    <>
      <Box
        sx={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              flexDirection: aspect ? 'column' : 'row',
              gap: aspect ? '' : '0.5rem',
            }}
          >
            <Grid
              color={firstValue <= lastValue ? 'green' : 'red'}
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
              }}
            >
              <Typography variant="h6" color="secondary">
                Current value of $1000 invested is $
                {activeValue ? (
                  <>{1000 + parseFloat(activeValue?.toFixed(2))}</>
                ) : (
                  <>{1000 + parseFloat(parseFloat(lastValue).toFixed(2))}</>
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
            </Grid>
          </Grid>

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
        </Grid>

        <ResponsiveContainer width="100%" height="auto" aspect={aspect}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              left: aspect ? -24 : -16,
            }}
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
      </Box>
    </>
  );
};

export default Graph;
