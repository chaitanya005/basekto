import { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    InputAdornment,
    Paper,
    Slider,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';

function getFormattedAmount(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const timeFrames = { '1D': 1, '1W': 7, '1M': 30, '1Y': 365 };

const InvestReturns = () => {

    const currency = '$';
    const minInvestAmount = 50000, maxInvestAmount = 500000, investAmountStep = 10000;
    const [investAmount, setInvestAmount] = useState({
        main: minInvestAmount,
        temp: minInvestAmount
    });

    const [returns, setReturns] = useState({
        amount: 95000,
        amountPerc: 23.86,
        fixedDeposits: 63500,
        fixedDepositsPerc: 8.29,
    });

    const handleInvestAmountChange = (value) => {
        setInvestAmount({ temp: value, main: value });
    }

    const handleInputChangeCommitted = (e) => {

        const amount = Number(e.target.value);
        if (amount < minInvestAmount) {
            handleInvestAmountChange(minInvestAmount);
        } else if (amount > maxInvestAmount) {
            handleInvestAmountChange(maxInvestAmount);
        } else {
            handleInvestAmountChange(amount);
        }
    };

    // Time Frame Buttons
    const [timeFrame, setTimeFrame] = useState(Object.keys(timeFrames)[0]);

    const handleTimeFrame = (e, newTimeFrame) => {
        newTimeFrame && setTimeFrame(newTimeFrame);
    };

    const timeFrameBtns = Object.keys(timeFrames).map((timeFrame) => (

        <ToggleButton
            key={ timeFrame }
            value={ timeFrame }
            sx={{
                p: '0.4rem',
                borderRadius: 8,
                flex: 1,
                '&.Mui-selected': {
                    background: 'black',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                        background: 'black'
                    }
                }
            }}
        >
            { timeFrame }
        </ToggleButton>
    ));

    useEffect(() => {
        console.log(investAmount);
    }, [investAmount.main]);

    return (

        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Investment Returns
            </Typography>

            <Grid
                container
                sx={{
                    '> *': {
                        border: '1px solid #e0e0e0',
                        overflow: 'hidden'
                    }
                }}
            >
                <Grid
                    item
                    xs={ 12 }
                    md={ 6 }
                    sx={{
                        borderRightWidth: { md: 0 },
                        borderBottomWidth: { xs: 0, md: 1 },
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: { xs: 8, md: 0 },
                        borderBottomLeftRadius: { md: 8 },
                    }}
                >
                    <Paper
                        variant="section"
                        color="primary"
                        elevation={ 0 }
                        sx={{
                            p: 4,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                        >
                            <Typography>
                                If you invest
                            </Typography>

                            <TextField
                                variant="standard"
                                color="primary"
                                size="small"
                                type="number"
                                value={ investAmount.temp }
                                onChange={
                                    (e) => setInvestAmount({
                                        ...investAmount,
                                        temp: Number(e.target.value)
                                    })
                                }
                                onBlur={ handleInputChangeCommitted }
                                sx={{
                                    width: '150px',
                                    '& .MuiInput-input': {
                                        pt: 0.5,
                                        fontWeight: 'bold',
                                        fontSize: 'large',
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography
                                                fontSize="large"
                                                fontWeight="bold"
                                            >
                                                { currency }
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Slider
                            color="secondary"
                            value={ investAmount.temp }
                            onChange={
                                (e) => setInvestAmount({
                                    ...investAmount,
                                    temp: Number(e.target.value)
                                })
                            }
                            onChangeCommitted={ () =>
                                handleInvestAmountChange(investAmount.temp)
                            }
                            step={ investAmountStep }
                            min={ minInvestAmount }
                            max={ maxInvestAmount }
                            sx={{ mb: 1.5 }}
                        />

                        <Typography sx={{ mb: 1 }}>
                            For period of
                        </Typography>

                        <ToggleButtonGroup
                            size="large"
                            value={ timeFrame }
                            exclusive
                            onChange={ handleTimeFrame }
                            sx={{
                                mb: '1rem',
                                display: 'flex'
                            }}
                        >
                            { timeFrameBtns }
                        </ToggleButtonGroup>
                    </Paper>
                </Grid>

                <Grid
                    item
                    xs={ 12 }
                    md={ 6 }
                    sx={{
                        p: 4,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: { md: 8 },
                        borderBottomLeftRadius: { xs: 8, md: 0 },
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        Invest with Basketo
                    </Typography>

                    <Paper
                        sx={{
                            mb: 2,
                            p: '0.75rem 1rem',
                            borderRadius: 0,
                            background: 'black',
                            color: 'white'
                        }}
                    >
                        <Typography fontSize="x-large" fontWeight="bold">
                            { currency + getFormattedAmount(returns.amount) }
                        </Typography>
                        <Typography fontSize="small">
                            Returns: { returns.amountPerc }% p.a
                        </Typography>
                    </Paper>

                    <Typography sx={{ mb: 1 }}>
                        Fixed Deposit
                    </Typography>

                    <Paper
                        sx={{
                            p: '0.75rem 1rem',
                            borderRadius: 0,
                            color: '#777'
                        }}
                    >
                        <Typography fontSize="large" fontWeight="bold">
                            { currency + getFormattedAmount(returns.fixedDeposits) }
                        </Typography>
                        <Typography fontSize="small">
                            Returns: { returns.fixedDepositsPerc }% p.a
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InvestReturns;