import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import EjectIcon from '@mui/icons-material/Eject';
import axios from 'axios';
import TimeFrameBtns from '../../Common/TimeFrameBtns';

const timeFrames = { '1D': 1, '1W': 7, '1M': 30, '1Y': 365 };
const currency = '$';
const minInvestAmount = 100,
  maxInvestAmount = 5000,
  investAmountStep = 100;

const InvestReturns = () => {
  const router = useRouter();
  const { bid } = router.query;

  const [timeFrame, setTimeFrame] = useState(Object.keys(timeFrames)[0]);
  const [investAmount, setInvestAmount] = useState({
    main: minInvestAmount,
    temp: minInvestAmount,
  });
  const [result, setResult] = useState(null);

  const validateProfitOrLoss = result?.growthPercentage > 0 ? true : false;

  const getReturns = async () => {
    if (bid) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/calculate`,
          {
            params: {
              id: bid,
              days: timeFrames[timeFrame],
              amount: investAmount.main,
            },
          }
        );
        setResult(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInvestAmountChange = (value) => {
    setInvestAmount({ temp: value, main: value });
  };

  const handleInputChangeCommitted = (e) => {
    let amount = Number(e.target.value);
    if (amount < minInvestAmount) {
      amount = minInvestAmount;
    } else if (amount > maxInvestAmount) {
      amount = maxInvestAmount;
    }
    handleInvestAmountChange(amount);
  };

  useEffect(() => {
    getReturns();
  }, [investAmount.main, timeFrame, bid]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Return on Investment (ROI)
      </Typography>

      <Grid
        container
        sx={{
          '> *': {
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
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
            elevation={0}
            sx={{
              p: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography>If you invest</Typography>

              <TextField
                variant="standard"
                color="primary"
                size="small"
                type="number"
                value={investAmount.temp}
                onChange={(e) =>
                  setInvestAmount({
                    ...investAmount,
                    temp: Number(e.target.value),
                  })
                }
                onBlur={handleInputChangeCommitted}
                sx={{
                  width: '150px',
                  '& .MuiInput-input': {
                    pt: 0.5,
                    fontWeight: 'bold',
                    fontSize: 'large',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography fontSize="large" fontWeight="bold">
                        {currency}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Slider
              value={investAmount.temp}
              onChange={(e) =>
                setInvestAmount({
                  ...investAmount,
                  temp: Number(e.target.value),
                })
              }
              onChangeCommitted={() =>
                handleInvestAmountChange(investAmount.temp)
              }
              step={investAmountStep}
              min={minInvestAmount}
              max={maxInvestAmount}
              sx={{ mb: 1.5 }}
            />

            <TimeFrameBtns
              value={timeFrame}
              setValue={setTimeFrame}
              timeFrames={timeFrames}
              getBtnText={(key) => key + ' ago'}
              size="large"
              color="primary"
              btnStyles={{
                p: '0.4rem',
                borderRadius: 8,
                textTransform: 'none',
                flexGrow: 1,
              }}
              btnGroupStyles={{
                mb: '1rem',
              }}
            />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            borderBottomRightRadius: 8,
            borderTopRightRadius: { md: 8 },
            borderBottomLeftRadius: { xs: 8, md: 0 },
          }}
        >
          <Paper
            sx={{
              mb: 2,
              p: '0.75rem 1rem',
              borderRadius: 0,
            }}
          >
            <Typography fontSize="40px" fontWeight="bold">
              ${Math.round(result?.roi)}
              <EjectIcon
                sx={{
                  color: `${validateProfitOrLoss ? 'green' : '#b30000'}`,
                  fontSize: '30px',
                  transform: `${
                    validateProfitOrLoss ? 'rotate(0deg)' : 'rotate(180deg)'
                  }`,
                }}
              />
            </Typography>

            <Typography
              fontSize="20px"
              fontWeight="bold"
              color={validateProfitOrLoss ? 'green' : '#b30000'}
            >
              {validateProfitOrLoss ? 'Profit' : 'Loss'}: $
              {Math.round(result?.returns)}
            </Typography>

            <Typography fontSize="small">
              Returns: {result?.growthPercentage?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvestReturns;
