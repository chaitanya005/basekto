import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import Explore from '@mui/icons-material/Explore';
import Notifications from '@mui/icons-material/Notifications';
import { Navigation } from '@basketo/web-ui';
import DialogBox from './DialogBox';


const SideNavigationLayout = ({ userAddress, children }) => {

    const router = useRouter();

    const navigationInfo = [
        {
            route: '/dashboard',
            onClick: () => router.push({ pathname: '/dashboard' }),
            label: 'Overview',
            icon: <DashboardRounded />,
        },
        {
            route: '/dashboard#notifications',
            onClick: () => router.push({ hash: '#notifications' }),
            label: 'Notifications',
            icon: <Notifications />,
        },
        {
            route: '/profile',
            onClick: () => router.push({ pathname: '/profile' }),
            label: 'Profile',
            icon: <AccountCircle />,
        },
        {
            route: '/explore',
            onClick: () => router.push({ pathname: '/explore' }),
            label: 'Explore',
            icon: <Explore />,
        },
    ];

    return (

        <>
            <DialogBox
                open={ userAddress === null }
                title={
                    <Typography
                        variant={'h5'}
                        textAlign="center"
                        gutterBottom
                    >
                        Wallet not connected!
                    </Typography>
                }
                actions={
                    <Button
                        variant="contained"
                        onClick={ () => router.push('/') }
                        fullWidth
                    >
                        Go Back
                    </Button>
                }
            >
                <Typography
                    textAlign="center"
                    marginBottom={ 3 }
                >
                    You can&apos;t view your portfolio without your Web3 wallet. Please connect your wallet first.
                </Typography>
            </DialogBox>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Navigation navInfo={ navigationInfo } showThemeToggle />
                <Box
                    sx={{
                        padding: '20px',
                        width: '100%',
                        maxWidth: 'lg',
                    }}
                >
                    { children }
                </Box>
            </Box>
        </>
    );
};

export default SideNavigationLayout;