import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {
  IconButton,
  Dialog,
  Typography,
  useMediaQuery,
  Divider,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { AccountBalanceWallet, Close } from '@mui/icons-material';

const pages = ['Explore', 'Learn'];

const clientSide = typeof window !== 'undefined';
let userRegistered = false;

const Navbar = () => {
  const router = useRouter();
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

            <Dialog
              maxWidth="sm"
              open={
                !userRegistered &&
                router.asPath.split('#')[1] === 'register'
              }
              onClose={ () => router.push({ hash: '' }) }
            >
              <form onSubmit={
                (e) => {
                  e.preventDefault();
                  userRegistered = true;
                  router.push('/explore');
                }
              }>
                <DialogTitle>
                  <Typography variant="h5" component="div">
                    Create New Account

                    <IconButton
                      onClick={ () => router.push({ hash: '' }) }
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Typography>
                </DialogTitle>

                <Divider />

                <DialogContent sx={{ maxWidth: '420px' }}>
                  <Paper elevation={ 0 }>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="First Name"
                      required
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      label="Last Name"
                      required
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      label="Email"
                      type="email"
                      required
                      sx={{ mb: 2 }}
                    />
                  </Paper>
                </DialogContent>

                <DialogActions sx={{ p: '0 1.5rem 2rem' }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    type="submit"
                    // onClick={ () => {} }
                  >
                    Create Account
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
