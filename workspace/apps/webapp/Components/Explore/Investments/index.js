import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LoadingAnimation, { LoadingText } from '../../Common/LoadingAnimation';
import Table from '../../Common/Table';
import FormatDate from '../../Common/FormatDate';
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

  const columns = {
    Tokens: (investment) => (
      <TokenGroup tokens={investment?.coins} isLoading={isLoading} />
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
  };

  const tableData = createTableData(columns, investments);

  return (
    <Table
      title="Investments"
      data={tableData}
      defaultColumnIndex="1"
      style={{ minWidth: { sm: 650 } }}
    />
  );
};

export default Investments;
