import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LoadingAnimation, { LoadingText } from '../../Common/LoadingAnimation';
import Table from '../../Common/Table';
import { createTableData } from '@basketo/web-utils';

const Token = ({ token, isLoading }) => (
  <Box display="flex" alignItems="center" gap={2.25}>
    <LoadingAnimation variant="circular" size="28px" isLoading={isLoading}>
      <Avatar
        src={token?.img}
        alt={token?.name + ' logo'}
        sx={{ width: 28, height: 28 }}
      />
    </LoadingAnimation>

    <LoadingText isLoading={isLoading}>{token?.name}</LoadingText>
  </Box>
);

const TokensTable = ({ tokensData, showDetails, isLoading }) => {
  const smDown = useMediaQuery(useTheme().breakpoints.down('sm'));
  const textAlign = smDown ? 'end' : 'center';

  const columns = {
    Tokens: (token) => <Token token={token} isLoading={isLoading} />,
    ...(showDetails
      ? {
          'Current Price': (token) => (
            <LoadingText textAlign={textAlign} isLoading={isLoading}>
              ${token?.price.toFixed(2)}
            </LoadingText>
          ),
        }
      : {}),
    'Weight (%)': (token) => (
      <LoadingText textAlign={textAlign} isLoading={isLoading}>
        {token?.weight}%
      </LoadingText>
    ),
  };

  const tableData = createTableData(columns, tokensData);

  return (
    <Table
      title="Allocations"
      data={tableData}
      defaultColumnIndex="2"
      style={{ minWidth: { sm: 650 } }}
    />
  );
};

export default TokensTable;
