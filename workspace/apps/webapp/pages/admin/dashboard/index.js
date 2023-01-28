import { Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import withAuth from 'apps/webapp/Components/Admin/withAuth';
import SideNavigationLayout from 'apps/webapp/Components/Common/SideNavigationLayout';
import { addAdminToken } from 'apps/webapp/features/userAddress';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import HistoryIcon from '@mui/icons-material/History';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const AdminDashboard = ({ children }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(
      addAdminToken({
        adminToken: '',
      })
    );
    Router.push('/admin/login');
  };

  const navigationInfo = [
    {
      route: '/admin/dashboard/publish-requests',
      onClick: () =>
        Router.push({ pathname: '/admin/dashboard/publish-requests' }),
      label: 'Publish Request',
      icon: <PublishedWithChangesIcon />,
    },
    {
      route: '/admin/dashboard/activity',
      onClick: () => Router.push({ pathname: '/admin/dashboard/activity' }),
      label: 'User Activity',
      icon: <HistoryIcon />,
    },
  ];
  return (
    <>
      <SideNavigationLayout navigationInfo={navigationInfo}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              variant="contained"
              sx={{ marginTop: '1rem' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          {children}
        </Container>
      </SideNavigationLayout>
    </>
  );
};

export default withAuth(AdminDashboard);
