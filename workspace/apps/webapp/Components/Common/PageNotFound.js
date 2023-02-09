import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PageNotFound = ({ heading, redirectionLink, redirectionText }) => (

    <>
        <Head>
            <title>
                {[`Basketo | ${ heading }`]}
            </title>
        </Head>

        <Typography
            variant="h4"
            textAlign="center"
            sx={{ mt: 10, mb: 4 }}
        >
            { heading }
        </Typography>

        <Box sx={{ textAlign: 'center' }}>
            <Link href={ redirectionLink }>
                <a>
                    <Button
                        variant="contained"
                        size="large"
                    >
                        { redirectionText }
                    </Button>
                </a>
            </Link>
        </Box>
    </>
);

export default PageNotFound;