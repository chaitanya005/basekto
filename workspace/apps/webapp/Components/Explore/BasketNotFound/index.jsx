import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BasketNotFound = () => (

    <>
        <Head>
            <title>
                {[`Basketo | 404 - Basket Not Found`]}
            </title>
        </Head>

        <Typography
            variant="h4"
            textAlign="center"
            sx={{ mt: 10, mb: 4 }}
        >
            404 - Basket Not Found
        </Typography>

        <Box sx={{ textAlign: 'center' }}>
            <Link href="/explore">
                <a>
                    <Button
                        variant="contained"
                        size="large"
                    >
                        Go to Explore page
                    </Button>
                </a>
            </Link>
        </Box>
    </>
);

export default BasketNotFound;