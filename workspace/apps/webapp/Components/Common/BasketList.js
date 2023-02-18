import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { BasketCard } from '@basketo/web-ui';
import MiniGraph from './MiniGraph';

const BasketList = ({ basketsData, isLoading, ...props }) => {
  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
              <Skeleton
                sx={{
                  borderRadius: '15px',
                  width: '100%',
                  height: '180px',
                  transform: 'scale(1, 1)',
                }}
                animation="wave"
              />
            </Grid>
          ))}
        </>
      ) : (
        <>
          {basketsData?.map((basket, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={4} mb={4}>
              <Link href={'/explore/' + basket?._id}>
                <a>
                  <BasketCard
                    data={{
                      title: basket?.name,
                      symbol: basket?.symbol,
                      basketeer: basket?.creator?.publicUrl,
                      description: basket?.description,
                      basketGrowth: basket?.growthRate,
                      coins: basket?.coins,
                      creator:
                        basket?.creator &&
                        basket?.creator?.firstName +
                          ' ' +
                          basket?.creator?.lastName,
                    }}
                    graph={<MiniGraph data={basket?.graphData} />}
                    {...props}
                  />
                </a>
              </Link>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default BasketList;
