import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ethAddEventListener, getBalance, getNetwork } from '@basketo/web-utils';

const BasketInvest = ({ tokensData }) => {

  const [balance, setBalance] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [amount, setAmount] = useState('');

  const tokens = tokensData?.map((token) => ({
    ...token,
    amount: (amount * token.weight) / 100,
  }));

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
    const accountsChangedCleanup = ethAddEventListener('accountsChanged', updateBalance);

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
          type="number"
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

        {amount && tokens && (
          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Token</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens?.map((token) => (
                  <TableRow
                    key={token.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          src={token.img}
                          alt={token.name + ' logo'}
                          sx={{ width: 28, height: 28 }}
                        />
                        {token.name}
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      {token.amount.toFixed(2)} {currencySymbol}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default BasketInvest;
