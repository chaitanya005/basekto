import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.background.default,
    color: '#0B754E',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    // backgroundColor: theme.palette.background.default,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}));

const TableHeadRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1.1px solid #777',
}));

const Investments = ({ investments }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: { sm: 650 } }}>
          <TableHead>
            <TableHeadRow>
              <StyledTableCell>Invested In</StyledTableCell>
              <StyledTableCell>Invested Amount</StyledTableCell>
              <StyledTableCell sx={{ color: '#0B754E' }}>
                Invested Date
              </StyledTableCell>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {investments?.map((investment, i) => (
              <TableRow
                key={ i }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <AvatarGroup sx={{ justifyContent: 'left' }} max={3}>
                    {investment?.coins.map((coin, i) => (
                      <Avatar
                        key={ i }
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
                <StyledTableCell>{investment?.amount}</StyledTableCell>
                <StyledTableCell>
                  <InvestedDate date={investment?.created_at} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const InvestedDate = ({ date }) => {
  const investedDate = moment(date).format('hh:mm DD/MM YYYY');
  return <div>{investedDate}</div>;
};

export default Investments;
