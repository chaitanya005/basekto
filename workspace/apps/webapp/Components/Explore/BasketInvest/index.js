import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '../../Common/Table';
import {
  ethAddEventListener,
  getBalance,
  getNetwork,
} from '@basketo/web-utils';

const Token = ({token}) => (
  <Box display="flex" alignItems="center" gap={1.5}>
    <Avatar
      src={token.img}
      alt={token.name + ' logo'}
      sx={{ width: 28, height: 28 }}
    />
    {token.name}
  </Box>
);

const BasketInvest = ({ tokensData, amount, setAmount }) => {
  const [balance, setBalance] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');

  const columns = {
    'Token': (token) => (
      <Token token={token} />
    ),
    'Amount': () => (
      `${amount} ${currencySymbol}`
    ),
  };

  const tableData = {
    headings: Object.keys(columns),
    rows: tokensData?.map(token =>
      Object.keys(columns).map(col => columns[col](token))
    ),
  };

  useEffect(() => {
    function updateBalance() {
      const result = getBalance();
      result.then(setBalance);
    }

    function updateCurrencySymbol() {
      getNetwork().then(({ nativeCurrency }) => {
        setCurrencySymbol(nativeCurrency.symbol);
      });
    }

    function update() {
      updateBalance();
      updateCurrencySymbol();
    }

    update();
    const networkChangedCleanup = ethAddEventListener('networkChanged', update);
    const accountsChangedCleanup = ethAddEventListener(
      'accountsChanged',
      updateBalance
    );

    return () => {
      networkChangedCleanup();
      accountsChangedCleanup();
    };
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" sx={{ px: 1 }}>
          <Typography>Available Balance</Typography>
          <Typography>
            {' '}
            {Number(balance).toFixed(2)} {currencySymbol}
          </Typography>
        </Box>

        <TextField
          label="Amount to Invest"
          type="numeric"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val == '' || val >= 0) {
              setAmount(val);
            }
          }}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{currencySymbol}</InputAdornment>
            ),
          }}
        />

        {amount && tokensData && (
          <Table
            data={tableData}
            stickyHeader
            style={{ maxHeight: 200 }}
          />
        )}
      </Box>
    </>
  );
};

export default BasketInvest;
