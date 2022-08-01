import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Dialog, Typography, useMediaQuery, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { AccountBalanceWallet } from '@mui/icons-material';
import CreateAccountDialog from './CreateAccountDialog';
import { ethers } from 'ethers';
import axios from 'axios';

const pages = [
  { title: 'Explore', path: '/explore' },
  { title: 'Learn', path: '#' },
];

const clientSide = typeof window !== 'undefined';
let account;

const Navbar = () => {
  const router = useRouter();
  const [userRegistered, setUserRegistered] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isUserExist, setIsUserExist] = useState(true);

  useEffect(() => {
    setUserAddress(localStorage.getItem('address'));
  }, []);

  const connectWallet = async () => {
    account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    accountChangedHandler(account);
  };

  const accountChangedHandler = async (newAccount) => {
    localStorage.setItem('address', newAccount[0]);
    setUserAddress(localStorage.getItem('address'));
    getAccountBalance(newAccount);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/exist?userAddress=${newAccount}`
    );
    setIsUserExist(response.data.isExist);
  };

  const getAccountBalance = async (account) => {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    });
    setUserBalance(ethers.utils.formatEther(balance));
  };

  typeof window !== 'undefined' &&
    window.ethereum.on('accountsChanged', (account) =>
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
              <Link href={page.path} key={page.title}>
                <a>
                  <Button
                    sx={{ fontSize: { xs: '10px', md: '14px' } }}
                    variant="text"
                    color="primary"
                  >
                    {page.title}
                  </Button>
                </a>
              </Link>
            ))}
          </Box>

          <div style={{ display: 'flex' }}>
            {!userAddress || userAddress == 'undefined' ? (
              <Button
                sx={{ fontSize: { xs: '10px', md: '14px' } }}
                variant="outlined"
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            ) : (
              <Typography>
                {userBalance}
                {'     '}
                {userAddress.slice(0, 4)}...
                {userAddress.slice(34, 42)}
              </Typography>
            )}

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

            {userAddress && (
              <CreateAccountDialog
                isOpen={!isUserExist}
                onClose={() => router.push({ hash: '' })}
                userAddress={userAddress}
                onAccountCreation={() => {
                  setUserRegistered(true);
                  router.push('/explore');
                }}
              />
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
