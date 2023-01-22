import { Button } from '@mui/material';
import { Container } from '@mui/system';
import withAuth from 'apps/webapp/Components/Admin/withAuth';
import { addAdminToken } from 'apps/webapp/features/userAddress';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import PublishRequests from '../../Components/Admin/PublishRequests';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(
      addAdminToken({
        adminToken: '',
      })
    );
    Router.push('/admin/login');
  };
  return (
    <>
      <Container maxWidth="lg">
        <Button
          variant="contained"
          sx={{ marginTop: '1rem' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <PublishRequests />
      </Container>
    </>
  );
};

export default withAuth(AdminDashboard);
