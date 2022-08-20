import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import TimeFrameBtns from './TimeFrameBtns';

const timeFrames = { '1D': 1, '1W': 7, '1M': 30, '1Y': 365 };

const Graph = ({ data, setDays }) => {

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeFrame, setTimeFrame] = useState(Object.keys(timeFrames)[0]);

  useEffect(() => {
    setDays(timeFrames[timeFrame]);
  }, [setDays, timeFrame]);

  return (
    <>
      <TimeFrameBtns
        value={ timeFrame }
        setValue={ setTimeFrame }
        timeFrames={ timeFrames }
        size="small"
        color="primary"
        btnStyles={{
          p: '0.2rem 0.4rem',
          fontWeight: 'bold',
        }}
        btnGroupStyles={{
          display: 'flex',
          mb: '1rem',
          justifyContent: 'end',
        }}
      />

      <ResponsiveContainer width="100%" height="auto" aspect={sm ? 1.25 : 2.25}>
        <LineChart
          width={500}
          height={300}
          data={data}
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
    </>
  );
};

export default Graph;
