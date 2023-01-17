import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Success = () => {

    const router = useRouter();
    const { basketId, basketName } = router.query;

    return (

        <>
            { typeof window !== 'undefined' && (
                <Confetti
                    width={window?.innerWidth}
                    height={window?.document.body.scrollHeight}
                    recycle={false}
                    numberOfPieces={2000}
                />
            )}

            <Box
                sx={{
                    margin: 'auto',
                    maxWidth: '900px',
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{ mt: 12, mb: 3 }}
                >
                    You&apos;ve successfully created
                    <Typography
                        variant="h4"
                        color="primary"
                        sx={{
                            display: 'inline',
                            textTransform: 'uppercase'
                        }}
                    >
                        { ` ${ basketName } ` }
                    </Typography>
                    Basket
                </Typography>

                <Typography
                    textAlign="center"
                    fontSize="large"
                >
                    Thank you for creating a basket.
                    You can now either view this basket in your dashboard or start investing in it right away!
                </Typography>

                <Box
                    sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={ () => router.push(`/explore/${ basketId }`) }
                    >
                        Invest in { basketName?.toUpperCase() }
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={ () => router.push('/dashboard') }
                    >
                        Go to Dashboard
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Success;