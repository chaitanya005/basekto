import { Box, Paper } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {

    return (

        <Paper variant="window" sx={{ overflowX: 'hidden' }}>
            <Navbar />
            <Box style={{ paddingTop: '70px' }}>
                { children }
                <Footer />
            </Box>
        </Paper>
    );
};

export default Layout;