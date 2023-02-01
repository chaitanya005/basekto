import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useSelector } from 'react-redux';
import { getTokens } from 'apps/webapp/features/selectTokens';
import { useQuery } from 'react-query';
import { getGraphDataWithGrowthRates } from '@basketo/web-utils';
import { Divider } from '@mui/material';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [days, setDays] = useState(1);
  const { selectedTokens } = useSelector(getTokens);

  const steps = ['Choose Tokens', 'Details', 'Review'];

  const {
    data: graphDataWithGrowthRates,
    isLoading: isGraphLoading,
    isFetching: isGraphFetching,
    isStale: isGraphDataStale,
    refetch: refetchGraphData,
  } = useQuery(
    ['createBasketGraph', selectedTokens, days],
    () => getGraphDataWithGrowthRates(selectedTokens, days),
    {
      staleTime: 300000,
      onError: () => console.log("Couldn't fetch Graph data."),
      enabled: false,
    }
  );

  const handleGraphdata = () => {
    if (selectedTokens.length !== 0 && isGraphDataStale) {
      refetchGraphData();
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <StepOne
              handleGraphdata={handleGraphdata}
              setActiveStep={setActiveStep}
              graphData={graphDataWithGrowthRates?.graphData}
              isGraphLoading={isGraphLoading || isGraphFetching}
              setDays={setDays}
            />
          </>
        );
      case 1:
        return <StepTwo setActiveStep={setActiveStep} />;
      case 2:
        return (
          <StepThree
            handleGraphdata={handleGraphdata}
            graphData={graphDataWithGrowthRates?.graphData}
            isGraphLoading={isGraphLoading || isGraphFetching}
            setDays={setDays}
            setActiveStep={setActiveStep}
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    handleGraphdata();
  }, [days]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ maxWidth: 'md', width: '100%', padding: '15px' }}>
        <Typography variant="h3" sx={{ fontFamily: 'Cinzel' }}>
          Create a Basket
        </Typography>
        <Divider />
        <Box
          sx={{
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            margin: '15px 0px',
            marginTop: '2rem',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, i) => (
              <Step key={i}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStep()}
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
