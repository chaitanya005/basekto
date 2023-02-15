import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FormatDate from '../../Common/FormatDate';
import LoadingAnimation, { LoadingText } from '../../Common/LoadingAnimation';
import Table from '../../Common/Table';
import PolyscanPopup from './PolyscanPopup';
import { createTableData } from '@basketo/web-utils';

const TokenGroup = ({ tokens, isLoading }) => (
  <AvatarGroup
    sx={{
      justifyContent: 'left',
      '& *': {
        width: '30px !important',
        height: '30px !important',
        fontSize: '1rem !important',
      },
    }}
    max={3}
  >
    {(isLoading ? Array.from({ length: 2 }) : tokens)?.map((coin, i) => (
      <LoadingAnimation
        key={i}
        variant="circular"
        size="28px"
        isLoading={isLoading}
      >
        <Avatar
          alt={coin?.symbol}
          src={coin?.img}
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </LoadingAnimation>
    ))}
  </AvatarGroup>
);

const Investments = ({ investments, isLoading }) => {
  const smDown = useMediaQuery(useTheme().breakpoints.down('sm'));
  const textAlign = smDown ? 'end' : 'center';

  const [investmentIndex, setInvestmentIndex] = useState(-1);

  const columns = {
    Tokens: (investment, i) => (
      <Box
        display="flex"
        alignItems="center"
        gap={0.25}
      >
        <TokenGroup tokens={investment?.coins} isLoading={isLoading} />
      </Box>
    ),
    Amount: (investment) => (
      <LoadingText textAlign={textAlign} isLoading={isLoading}>
        {investment?.amount} MATIC
      </LoadingText>
    ),
    Date: (investment) => (
      <LoadingText textAlign={textAlign} isLoading={isLoading}>
        <FormatDate
          date={investment?.createdAt || investment?.created_at}
          format={'hh:mma DD/MM YYYY'}
        />
      </LoadingText>
    ),
    'Transaction Details': (investment, i) => investment?.coins[0].txHash && (
      <>
        <Button
          onClick={() => setInvestmentIndex(i)}
          sx={{
            background: '#8247e519',
            color: '#8247e5',
            '&:hover': {
              background: '#8247e525',
            },
          }}
        >
          Check in PolyScan
        </Button>

        <PolyscanPopup
          open={investmentIndex === i}
          tokens={investment.coins}
          amount={investment.amount}
          onClose={() => setInvestmentIndex(-1)}
        />
      </>
    ),
  };

  const tableData = createTableData(columns, investments);

  return (
    <Table
      title="Investments"
      data={tableData}
      defaultColumnIndex="3"
      style={{ minWidth: { sm: 650 } }}
    />
  );
};

export default Investments;
