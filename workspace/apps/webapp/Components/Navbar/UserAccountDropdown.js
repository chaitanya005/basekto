import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PowerOffRoundedIcon from '@mui/icons-material/PowerOffRounded';
import {
  getBalance,
  getNetwork,
  ethAddEventListener,
} from '@basketo/web-utils';

const Menu = styled(MuiMenu)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '0.75rem',
  },
}));

const UserAccountDropdown = ({ button, userAddress, disconnectWallet }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState({
    name: '',
    currency: '',
    icon: '',
  });

  useEffect(() => {
    const updateBalance = () => getBalance().then(setBalance);

    const updateNetwork = () => {
      getNetwork().then(({ title, name, nativeCurrency, icon }) => {
        setNetwork({
          name: title || name,
          currency: nativeCurrency.symbol,
          icon: icon,
        });
      });
    };

    const update = () => {
      updateNetwork();
      updateBalance();
    };

    update();
    const cleanup = ethAddEventListener('networkChanged', update);
    return cleanup;
  }, [userAddress]);

  return (
    <>
      <Button onClick={handleClick} {...button.props}>
        {button.children}
      </Button>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src=""
                alt=""
                sx={{
                  mr: 1,
                  width: { xs: '1.5rem', sm: '2rem' },
                  height: { xs: '1.5rem', sm: '2rem' },
                }}
              />

              <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {`${userAddress.slice(0, 4)}...${userAddress.slice(38, 42)}`}
              </Typography>
            </Box>

            <Box display="flex" sx={{ gap: 0.75 }}>
              <Tooltip title={copySuccess ? 'Copied!' : 'Copy account address'}>
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(userAddress).then(
                      function () {
                        setCopySuccess(true);
                        setTimeout(() => setCopySuccess(false), 2000);
                      },
                      function (err) {
                        console.error('Could not copy text:', err);
                      }
                    );
                  }}
                  sx={{
                    background: '#fff1',
                    border: '1px solid',
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Disconnect account">
                <IconButton
                  color="error"
                  size="small"
                  onClick={disconnectWallet}
                  sx={{
                    background: '#fff1',
                    border: '1px solid',
                  }}
                >
                  <PowerOffRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography fontSize="2rem">
              {Number(balance).toFixed(3)} {network.currency}
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Avatar
                src={`https://icons.llamao.fi/icons/chains/rsz_${network.icon}.jpg`}
                alt={network.icon}
                sx={{
                  width: '1.25rem',
                  height: '1.25rem',
                }}
              />

              <Typography
                color="silver"
                fontSize="small"
                sx={{ textTransform: 'capitalize' }}
              >
                {network.name}
              </Typography>
            </Box>
          </Box>

          {!router.pathname.includes('dashboard') && (
            <Box sx={{ mt: 3.5 }}>
              <Link href="/dashboard">
                <a>
                  <Button variant="contained" fullWidth onClick={handleClose}>
                    Go to Dashboard
                  </Button>
                </a>
              </Link>
            </Box>
          )}
        </Box>
      </Menu>
    </>
  );
};

export default UserAccountDropdown;
