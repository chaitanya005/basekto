import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {
  Dialog,
  Typography,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { useRouter } from 'next/router';
import { AccountBalanceWallet } from '@mui/icons-material';
import CreateAccountDialog from './CreateAccountDialog';
import { ethers } from 'ethers';
import axios from 'axios';
import TelegramIcon from '@mui/icons-material/Telegram';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import { toggleTheme } from '@basketo/web-ui';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import UserAccountDialog from './UserAccountDialog';

const pages = [
  { title: 'Explore', path: '/explore' },
  { title: 'Create', path: '/create' },
  { title: 'Learn', path: '#' },
  {
    title: 'Early Access',
    path: 'https://t.me/basketofinance',
    icon: <TelegramIcon />,
  },
];

const clientSide = typeof window !== 'undefined';
let account;

const checkIsUserExist = async (userAddress) => (await axios.get(
  `${process.env.NEXT_PUBLIC_BACKEND_API}/user/exist?userAddress=${userAddress}`
)).data.isExist;

const Navbar = () => {
  const {
    palette: { mode },
  } = useTheme();
  const currentTheme = useTheme();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isUserExist, setIsUserExist] = useState(true);

  const [userAccountDialogOpen, setUserAccountDialogOpen] = useState(false);

  const handleThemeToggle = () => {
    toggleTheme({ to: currentTheme.palette.mode == 'dark' ? 'light' : 'dark' });
  };

  useEffect(() => {
    setUserAddress(localStorage.getItem('address'));
  }, []);

  useEffect(() => {
    userAddress && (async () =>
      setIsUserExist(await checkIsUserExist(userAddress))
    )();
  }, [userAddress]);

  const connectWallet = async () => {
    account = await window?.ethereum?.request({
      method: 'eth_requestAccounts',
    });
    accountChangedHandler(account);
  };

  const disconnectWallet = () => {
    accountChangedHandler([]);
    setUserAccountDialogOpen(false);
  };

  const accountChangedHandler = async (newAccount) => {
    if (newAccount[0]) {
      localStorage.setItem('address', newAccount[0]);
      setUserAddress(localStorage.getItem('address'));
    } else {
      localStorage.removeItem('address');
      setUserAddress(null);
    }
    getAccountBalance(newAccount);
  };

  const getAccountBalance = async (account) => {
    const balance = await window.ethereum?.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    });
    setUserBalance(ethers.utils.formatEther(balance));
  };

  typeof window !== 'undefined' &&
    window.ethereum?.on('accountsChanged', (account) =>
      accountChangedHandler(account)
    );

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
          <Box
            sx={{
              fontSize: { xs: '14px', md: '20px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <img
                src={`/images${mode == 'dark' ? 'D' : ''}/logo.png`}
                alt="Basketo"
                style={{ maxWidth: '150px' }}
              />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
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
            ))}
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
                <Button
                  sx={{ fontSize: { xs: '10px', md: '14px' } }}
                  variant="outlined"
                  onClick={ () => setUserAccountDialogOpen(true) }
                >
                  <Typography>
                    {userBalance}
                    {'     '}
                    {userAddress.slice(0, 4)}...
                    {userAddress.slice(34, 42)}
                  </Typography>
                </Button>

                <UserAccountDialog
                  open={ userAccountDialogOpen }
                  onClose={
                    () => setUserAccountDialogOpen(false)
                  }
                  userAddress={
                   `${userAddress.slice(0, 4)}...${userAddress.slice(34, 42)}`
                  }
                  disconnectWallet={ disconnectWallet }
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

            { userAddress && (
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
              <Button variant="outlined" onClick={handleThemeToggle}>
                {currentTheme.palette.mode === 'dark' ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </Button>
            ) : null}
          </div>

          <IconButton
            onClick={handleOpenNavMenu}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <Link href={page.path} key={page.title}>
                <a>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{ justifyContent: 'center' }}
                  >
                    {page.icon && <ListItemIcon>{page.icon}</ListItemIcon>}

                    <Typography>{page.title}</Typography>
                  </MenuItem>
                </a>
              </Link>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
