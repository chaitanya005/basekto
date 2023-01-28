import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Navigation } from '@basketo/web-ui';

const SideNavigationLayout = ({ userAddress, children, navigationInfo }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Navigation navInfo={navigationInfo} showThemeToggle />
      <Box
        sx={{
          padding: '20px',
          width: '100%',
          maxWidth: 'lg',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SideNavigationLayout;
