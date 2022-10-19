import { useState } from 'react';
import { Box, Button, Chip, InputAdornment, TextField, Typography } from '@mui/material';

const BasketInvest = () => {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    return (

        <>

            <Box
                display="flex"
                flexDirection="column"
                gap={ 3 }
                sx={{ mb: 4 }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ px: 1 }}
                >
                    <Typography>
                        Available Balance
                    </Typography>
                    <Typography>
                        $50.25
                    </Typography>
                </Box>

                <TextField
                    // variant="standard"
                    label="Amount to Invest"
                    required
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />

                <TextField
                    // variant="standard"
                    label="Extra Text Field"
                    // required
                    fullWidth
                />

                <TextField
                    // variant="standard"
                    label="Extra Text Field"
                    // required
                    fullWidth
                />

                <Box display="flex" justifyContent="center" gap={ 1 }>
                    { ['25%', '50%', '75%', '100%'].map(label => (
                        <Chip
                            key={ label }
                            label={ label }
                            clickable
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default BasketInvest;