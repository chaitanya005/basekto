import { Box, Paper } from '@mui/material';
import Navbar from '../Navbar';

const Layout = ({ children }) => {
  return (
    <Paper variant="window" sx={{ overflowX: 'visible' }}>
      <Navbar />
      <Box style={{ paddingTop: '70px' }}>{children}</Box>
    </Paper>
  );
};

export default Layout;
