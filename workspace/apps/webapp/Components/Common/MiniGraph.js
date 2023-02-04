import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import TimeFrameBtns from './TimeFrameBtns';

const MiniGraph = ({ data }) => {
  const [firstValue, setFirstValue] = useState('');
  const [lastValue, setLastValue] = useState('');

  useEffect(() => {
    setFirstValue(data?.[0]?.['price']);
    setLastValue(data?.[data?.length - 1]?.['price']);
  }, []);
  const timeFrames = { '1W': 7 };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <TimeFrameBtns
          timeFrames={timeFrames}
          size="small"
          color="primary"
          btnStyles={{
            p: '0.4rem 0.4rem',
            fontWeight: 'bold',
            fontSize: '10px',
            color: '#0b754e',
          }}
          btnGroupStyles={{
            display: 'flex',
            height: '20px',
          }}
          disableOnClick
        />
      </Box>
      <ResponsiveContainer width="100%" height="auto" aspect={2.5}>
        <LineChart
          width={250}
          height={100}
          data={data}
          style={{
            fontSize: 'clamp(0.75rem, 0.6rem + 1vw, 1rem)',
          }}
        >
          <YAxis hide={true} domain={['auto', 'auto']} tickCount={14} />
          <Line
            dot={false}
            type="monotone"
            dataKey="price"
            stroke={firstValue <= lastValue ? 'green' : 'red'}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MiniGraph;
