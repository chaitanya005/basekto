import { Box, Container } from '@mui/system';
import { getRequest } from 'apps/webapp/axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Tab, Tabs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import FormatDate from '../Common/FormatDate';
import Link from 'next/link';
import CommonTabs from '../Common/CommonTabs';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      sx={{ mt: 4, mb: 8 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const TableHeadRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1.1px solid #777',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
  },
}));

const UserActivity = () => {
  const [userActivity, setUserActivity] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    const fetchUserActivity = () => {
      getRequest('/admin/dashboard/users/activity')
        .then((res) => setUserActivity(res.data))
        .catch((err) => console.log(err));
    };
    fetchUserActivity();
  }, []);

  const handleTabIndexVal = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <CommonTabs
        tabLabels={[
          'Newly Created Baskets',
          'Newly Published Baskets',
          'New Investments in Baskets',
          'New Users',
        ]}
        variant="fullWidth"
        tabIndex={tabIndex}
        handleChange={handleTabIndexVal}
        tabPanels={[
          <TableContainer
            component={Card}
            sx={{ borderRadius: '10px', marginTop: '1rem' }}
          >
            <Table sx={{ minWidth: { sm: 650 } }}>
              <TableHead>
                <TableHeadRow>
                  <StyledTableCell>Basket Id</StyledTableCell>
                  <StyledTableCell>Basket Creator</StyledTableCell>
                  <StyledTableCell>Published or Tokens</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {userActivity?.baskets.map((basket, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>
                      <Link href={`/explore/` + basket._id}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {basket._id}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link href={`/user/` + basket.accountId}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {basket.accountId}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      {!basket.publishedBasket ? (
                        <>
                          {basket.coins.map((coin) => (
                            <>
                              {coin.name} - {coin.weight}% <br />
                            </>
                          ))}
                        </>
                      ) : (
                        <>{basket.publishedBasket}</>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormatDate
                        date={basket.createdAt}
                        format={'hh:mma DD/MM YYYY'}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>,
          <TableContainer
            component={Card}
            sx={{ borderRadius: '10px', marginTop: '1rem' }}
          >
            <Table sx={{ minWidth: { sm: 650 } }}>
              <TableHead>
                <TableHeadRow>
                  <StyledTableCell>Basket Id</StyledTableCell>
                  <StyledTableCell>Basket Creator</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {userActivity?.publishedBaskets.map((basket, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>
                      <Link href={'/explore/' + basket.basketId}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {basket.basketId}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link href={'/user/' + basket.userAddress}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {basket.userAddress}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormatDate
                        date={basket.createdAt}
                        format={'hh:mma DD/MM YYYY'}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>,
          <TableContainer
            component={Card}
            sx={{ borderRadius: '10px', marginTop: '1rem' }}
          >
            <Table sx={{ minWidth: { sm: 650 } }}>
              <TableHead>
                <TableHeadRow>
                  <StyledTableCell>Invested Basket Id</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>User Address</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {userActivity?.invests.map((investment, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>
                      <Link href={`/explore/` + investment.basketId}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {investment.basketId}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{investment.amount}</StyledTableCell>
                    <StyledTableCell>
                      <Link href={`/user/` + investment.userAddress}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {investment.userAddress}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormatDate
                        date={investment.createdAt}
                        format={'hh:mma DD/MM YYYY'}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>,
          <TableContainer
            component={Card}
            sx={{ borderRadius: '10px', marginTop: '1rem' }}
          >
            <Table sx={{ minWidth: { sm: 650 } }}>
              <TableHead>
                <TableHeadRow>
                  <StyledTableCell>User Address</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Public Url</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {userActivity?.users.map((user, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>
                      <Link href={`/user/` + user.userAddress}>
                        <Button variant="text" sx={{ padding: '0' }}>
                          {user.userAddress}
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      {user.firstName} {user.lastName}
                    </StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.publicUrl}</StyledTableCell>
                    <StyledTableCell>
                      <FormatDate
                        date={user.createdAt}
                        format={'hh:mma DD/MM YYYY'}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>,
        ]}
      />
    </Container>
  );
};

export default UserActivity;
