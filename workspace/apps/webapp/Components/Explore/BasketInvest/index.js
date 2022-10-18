import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BasketShareDialog from './BasketShareDialog';

const BasketInvest = ({ tokensData }) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const tokens = tokensData?.map((token) => ({
        ...token,
        amount: amount * token.weight / 100
    }));

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    return (

        <>
            <Box
                display="flex"
                justifyContent="end"
                marginBottom={ 3 }
            >
                <Button
                    onClick={ handleClickOpen }
                    startIcon={ <ShareIcon /> }
                >
                    Share
                </Button>

                <BasketShareDialog
                    open={ dialogOpen }
                    setOpen={ setDialogOpen }
                />
            </Box>

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
                    label="Amount to Invest"
                    type="number"
                    value={ amount }
                    onChange={ (e) => {
                        const val = e.target.value;
                        if (val == '' || val >= 0) {
                            setAmount(val);
                        }
                    }}
                    required
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />

                { amount && tokens && (

                    <TableContainer
                        component={ Paper }
                        sx={{ maxHeight: 200 }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Token</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { tokens?.map((token) => (
                                    <TableRow
                                        key={ token.name }
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box display="flex" alignItems="center" gap={ 1.5 }>
                                                <Avatar
                                                    src={ token.img }
                                                    alt={ token.name + ' logo' }
                                                    sx={{ width: 28, height: 28 }}
                                                />
                                                { token.name }
                                            </Box>
                                        </TableCell>

                                        <TableCell align="right">
                                            ${ token.amount.toFixed(2) }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </>
    );
}

export default BasketInvest;