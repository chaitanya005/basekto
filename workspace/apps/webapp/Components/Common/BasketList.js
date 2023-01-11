import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { BasketCard } from '@basketo/web-ui';

const BasketList = ({ baskets, isLoading, ...props }) => {
  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
              <Skeleton
                sx={{
                  borderRadius: '15px',
                  width: '100%',
                  height: '300px',
                }}
                animation="wave"
              />
            </Grid>
          ))}
        </>
      ) : (
        <>
          {baskets?.map((basket, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
              <Link href={'/explore/' + basket?._id}>
                <a>
                  <BasketCard
                    data={{
                      title: basket?.name,
                      symbol: basket?.symbol,
                      basketeer: basket?.accountId,
                      description: basket?.description,
                      basketGrowth: basket?.growthRate,
                      coins: basket?.coins,
                    }}
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
