import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';

const TimeFrameBtns = ({
  value,
  setValue,
  timeFrames,
  getBtnText,
  size,
  color,
  btnStyles,
  btnGroupStyles,
  disableOnClick,
}) => {
  const handleChange = (e, newValue) => {
    newValue && setValue(newValue);
  };

  return (
    <>
      <ToggleButtonGroup
        size={size}
        value={value}
        exclusive
        onChange={!disableOnClick && handleChange}
        sx={btnGroupStyles}
      >
        {Object.keys(timeFrames).map((timeFrame) => (
          <ToggleButton
            key={timeFrame}
            value={timeFrame}
            color={color}
            sx={btnStyles}
          >
            {getBtnText ? getBtnText(timeFrame) : timeFrame}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default TimeFrameBtns;
