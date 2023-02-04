import { Container } from '@mui/system';
import { getRequest } from 'apps/webapp/axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FormatDate from '../Common/FormatDate';
import Link from 'next/link';
import CommonTabs from '../Common/CommonTabs';
import Table from '../Common/Table';
import { createTableData } from '@basketo/web-utils';

const TableBtnStyle = ({ value, url }) => {
  return (
    <Link href={url}>
      <Button variant="text" sx={{ padding: '0' }}>
        {value}
      </Button>
    </Link>
  );
};

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

  const newlyCreatedBasketsColumns = {
    'Basket Id': (basket) => (
      <TableBtnStyle value={basket?._id} url={`/explore/` + basket?._id} />
    ),
    'Basket Creator': (basket) => (
      <TableBtnStyle
        value={basket?.accountId}
        url={`/user/` + basket?.accountId}
      />
    ),
    'Publish or Tokens': (basket) =>
      !basket.publishedBasket ? (
        <>
          {basket.coins.map((coin) => (
            <>
              {coin.name} - {coin.weight}% <br />
            </>
          ))}
        </>
      ) : (
        <>{basket.publishedBasket}</>
      ),
    Created: (basket) => (
      <FormatDate date={basket.createdAt} format={'hh:mma DD/MM YYYY'} />
    ),
  };

  const newlyPublishedBasketsColumns = {
    'Basket Id': (basket) => (
      <TableBtnStyle value={basket?._id} url={`/explore/` + basket?._id} />
    ),
    'Basket Creator': (basket) => (
      <TableBtnStyle
        value={basket?.userAddress}
        url={`/user/` + basket?.userAddress}
      />
    ),
    Created: (basket) => (
      <FormatDate date={basket.createdAt} format={'hh:mma DD/MM YYYY'} />
    ),
  };

  const newInvestmentsColumns = {
    'Invested Basket Id': (investment) => (
      <TableBtnStyle
        value={investment?._id}
        url={`/explore/` + investment?._id}
      />
    ),
    Amount: (investment) => {
      investment.amount;
    },
    'User Address': (investment) => (
      <TableBtnStyle
        value={investment?.userAddress}
        url={`/user/` + user.userAddress}
      />
    ),
    Creator: (investment) => (
      <FormatDate date={investment.createdAt} format={'hh:mma DD/MM YYYY'} />
    ),
  };

  const newUsersColumns = {
    'User Address': (user) => (
      <TableBtnStyle
        value={user.userAddress}
        url={`/user/` + user.userAddress}
      />
    ),
    Name: (user) => (
      <>
        {user.firstName} {user.lastName}
      </>
    ),
    Email: (user) => {
      user.email;
    },
    'Public Url': (user) => {
      user.publicUrl;
    },
    Created: (user) => (
      <FormatDate date={user.createdAt} format={'hh:mma DD/MM YYYY'} />
    ),
  };

  const newlyCreatedBasketsTableData = createTableData(
    newlyCreatedBasketsColumns,
    userActivity?.baskets
  );

  const newlyPublishedBasketsTableData = createTableData(
    newlyPublishedBasketsColumns,
    userActivity?.publishedBaskets
  );

  const newInvestmentsTableData = createTableData(
    newInvestmentsColumns,
    userActivity?.invests
  );

  const newUsersTableData = createTableData(
    newUsersColumns,
    userActivity?.users
  );

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
          <Table data={newlyCreatedBasketsTableData} />,
          <Table data={newlyPublishedBasketsTableData} />,
          <Table data={newInvestmentsTableData} />,
          <Table data={newUsersTableData} />,
        ]}
      />
    </Container>
  );
};

export default UserActivity;
