import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import FormatDate from '../../Common/FormatDate';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
  },
}));

const TableHeadRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1.1px solid #777',
}));

const Investments = ({ investments }) => {
  return (
    <>
      <Typography variant="h5" fontWeight={'bold'}>
        Investments
      </Typography>
      <TableContainer
        component={Card}
        sx={{ borderRadius: '10px', marginTop: '1rem' }}
      >
        <Table sx={{ minWidth: { sm: 650 } }}>
          <TableHead>
            <TableHeadRow>
              <StyledTableCell>Tokens</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {investments?.map((investment, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <AvatarGroup sx={{ justifyContent: 'left' }} max={3}>
                    {investment?.coins.map((coin, i) => (
                      <Avatar
                        key={i}
                        alt={coin?.symbol}
                        src={coin?.img}
                        sx={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    ))}
                  </AvatarGroup>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {investment?.amount} MATIC
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormatDate
                    date={investment?.createdAt || investment?.created_at}
                    format={'hh:mma DD/MM YYYY'}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Investments;
