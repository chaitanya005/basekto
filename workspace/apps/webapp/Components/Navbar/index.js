import Link from 'next/link';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {
  Dialog,
  Typography,
  useMediaQuery,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { AccountBalanceWallet } from '@mui/icons-material';
import CreateAccountDialog from './CreateAccountDialog';

const pages = ['Explore', 'Learn'];

const clientSide = typeof window !== 'undefined';
const userAddress = '0000xx3453543';

const Navbar = () => {
  const router = useRouter();
  const [userRegistered, setUserRegistered] = useState(false);
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        height: '75px',
        background: 'rgba(0,0,0,0)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        zIndex: '10',
      }}
    >
      <Container sx={{ height: '100%', maxWidth: 'lg' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '14px', md: '20px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/">Basketo</Link>
          </Box>
          <Box>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ fontSize: { xs: '10px', md: '14px' } }}
                // onClick={}
                variant="text"
                color="primary"
              >
                {page}
              </Button>
            ))}
          </Box>

          <div style={{ display: 'flex' }}>
            <Button
              sx={{ fontSize: { xs: '10px', md: '14px' } }}
              variant="outlined"
              onClick={() =>
                typeof window.ethereum === 'undefined'
                  ? router.push({ hash: '#connect' })
                  : !userRegistered
                    ? router.push({ hash: '#register' })
                    : router.push('/explore')
              }
            >
              App
            </Button>

            <Dialog
              open={
                clientSide &&
                typeof window?.ethereum === 'undefined' &&
                router.asPath.split('#')[1] === 'connect'
              }
              onClose={() => router.push({ hash: '' })}
            >
              <Box sx={{ padding: '20px', maxWidth: '300px' }}>
                <Typography variant="h5">Install MetaMask</Typography>
                <Divider sx={{ m: '10px 0px' }} />
                <Typography>
                  You&apos;ll need a Web3 wallet to create and explore Baskets.
                </Typography>
                <br />
                <Button
                  variant="outlined"
                  fullWidth
                  start={<AccountBalanceWallet />}
                  href={'https://metamask.io/download/'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install MetaMask
                </Button>
              </Box>
            </Dialog>

            <CreateAccountDialog
              isOpen={
                !userRegistered &&
                router.asPath.split('#')[1] === 'register'
              }
              onClose={ () => router.push({ hash: '' }) }
              userAddress={ userAddress }
              onAccountCreation={
                () => {
                  setUserRegistered(true);
                  router.push('/explore');
                }
              }
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
