import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { utils } from 'ethers';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TelegramIcon from '@mui/icons-material/Telegram';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme } from '@basketo/web-ui';
import { ethAddEventListener } from '@basketo/web-utils';
import CreateAccountDialog from './CreateAccountDialog';
import UserAccountDropdown from './UserAccountDropdown';

const pages = [
  { title: 'Explore', path: '/explore', icon: <ExploreIcon /> },
  { title: 'Create', path: '/create', icon: <AddCircleOutlineIcon /> },
  { title: 'Learn', path: '#', icon: <LightbulbIcon /> },
  {
    title: 'Early Access',
    path: 'https://t.me/basketofinance',
    icon: <TelegramIcon />,
  },
  {
    title: 'Theme',
    path: '#',
  },
];

const clientSide = typeof window !== 'undefined';
let account;

const checkIsUserExist = async (userAddress) =>
  (
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/exist?userAddress=${userAddress}`
    )
  ).data.isExist;

const Navbar = () => {
  const {
    palette: { mode },
  } = useTheme();
  const currentTheme = useTheme();
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [userAddress, setUserAddress] = useState(null);
  const [isUserExist, setIsUserExist] = useState(true);

  const handleThemeToggle = () => {
    toggleTheme({ to: currentTheme.palette.mode == 'dark' ? 'light' : 'dark' });
  };

  const updateUserAddress = (address) => {
    localStorage.setItem('address', address);
    setUserAddress(localStorage.getItem('address'));
  };

  const removeUserAddress = () => {
    localStorage.removeItem('address');
    setUserAddress(null);
    router.push('/');
  };

  useEffect(() => {

    if (clientSide) {

      if (typeof window?.ethereum === 'undefined') {
        removeUserAddress();
      } else {
        setUserAddress(localStorage.getItem('address'));
      }

      const cleanup = ethAddEventListener(
        'accountsChanged',
        accountChangedHandler
      );
      return cleanup;
    }
  }, []);

  useEffect(() => {
    userAddress
      ? (async () => {
          setIsUserExist(await checkIsUserExist(userAddress));
        })()
      : setIsUserExist(true);
  }, [userAddress]);

  const connectWallet = async () => {
    if (clientSide && typeof window?.ethereum === 'undefined') {
      router.push({ hash: 'install-metamask' });
      return;
    }
    account = await window?.ethereum?.request({
      method: 'eth_requestAccounts',
    });
    accountChangedHandler(account);
  };

  const disconnectWallet = () => {
    accountChangedHandler([]);
  };

  const accountChangedHandler = async (account) => {

    if (account[0]) {
      updateUserAddress(utils.getAddress(account[0]));
    } else {
      removeUserAddress();
    }
  };

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
        zIndex: '20',
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { md: 'none' } }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            variant="temporary"
            open={isDrawerOpen}
            sx={{
              display: {
                md: 'none',
              },
            }}
            onClose={() => setIsDrawerOpen(false)}
          >
            {pages.map((page) =>
              page.title != 'Theme' ? (
                <Link href={page.path} key={page.title}>
                  <a>
                    <Button
                      sx={{
                        fontSize: { xs: '1rem', md: '1rem' },
                        height: '4em',
                        padding: '0.5em 2.2em',
                        gap: '1rem',
                      }}
                      variant="text"
                      color="primary"
                      startIcon={page.icon}
                    >
                      {page.title}
                    </Button>
                  </a>
                </Link>
              ) : (
                <a key={page.title}>
                  <Button
                    sx={{
                      fontSize: { xs: '1rem', md: '1rem' },
                      height: '4em',
                      padding: '0.5em 2.2em',
                      gap: '1rem',
                    }}
                    onClick={handleThemeToggle}
                    startIcon={
                      currentTheme.palette.mode === 'dark' ? (
                        <LightModeIcon />
                      ) : (
                        <DarkModeIcon />
                      )
                    }
                  >
                    {currentTheme.palette.mode === 'dark'
                      ? 'LightMode'
                      : 'DarkMode'}
                  </Button>
                  <Divider />
                </a>
              )
            )}
          </Drawer>

          <Box
            sx={{
              fontSize: { xs: '14px', md: '20px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <a style={{ display: 'flex' }}>
                <img
                  src={`/images${mode == 'dark' ? 'D' : ''}/logo.png`}
                  alt="Basketo"
                  style={{ maxWidth: '150px' }}
                />
              </a>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) =>
              page.title != 'Theme' ? (
                <Link href={page.path} key={page.title}>
                  <a>
                    <Button
                      sx={{ fontSize: { xs: '10px', md: '14px' } }}
                      variant="text"
                      color="primary"
                      startIcon={page.icon}
                    >
                      {page.title}
                    </Button>
                  </a>
                </Link>
              ) : null
            )}
          </Box>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!userAddress || userAddress == 'undefined' ? (
              <Button
                sx={{ fontSize: { xs: '10px', md: '14px' } }}
                variant="outlined"
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            ) : (
              <Grid display={'flex'} gap={'1rem'} alignItems={'center'}>
                <UserAccountDropdown
                  button={{
                    children: (
                      <Typography>
                        {userAddress.slice(0, 4)}...
                        {userAddress.slice(34, 42)}
                      </Typography>
                    ),
                    props: {
                      sx: {
                        fontSize: {
                          xs: '10px',
                          md: '14px'
                        }
                      },
                      variant: 'outlined'
                    }
                  }}
                  userAddress={ userAddress }
                  disconnectWallet={disconnectWallet}
                />
              </Grid>
            )}
            {/* <a
              href="https://t.me/basketofinance"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                type="submit"
                variant="contained"
                endIcon={<TelegramIcon />}
              >
                Early Access
              </Button>
            </a> */}

            <Dialog
              open={router.asPath.split('#')[1] === 'install-metamask'}
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

            {userAddress && (
              <CreateAccountDialog
                isOpen={!isUserExist}
                userAddress={userAddress}
                onAccountCreation={() => {
                  setIsUserExist(true);
                  router.push('/explore');
                }}
              />
            )}
            {!router.pathname.includes('dashboard') ? (
              <Button
                // variant="outlined"
                onClick={handleThemeToggle}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                {currentTheme.palette.mode === 'dark' ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </Button>
            ) : null}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
