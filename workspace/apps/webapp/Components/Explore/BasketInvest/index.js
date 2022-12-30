import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { getBalance } from '@basketo/web-utils';

const BasketInvest = ({ tokensData }) => {
  const currencySymbol = 'MATIC';
  const [balance, setBalance] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const tokens = tokensData?.map((token) => ({
    ...token,
    amount: (amount * token.weight) / 100,
  }));

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    const result = getBalance();
    result.then(setBalance);
  }, [getBalance]);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" sx={{ px: 1 }}>
          <Typography>Available Balance</Typography>
          <Typography>
            {' '}
            {balance} {currencySymbol}
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
