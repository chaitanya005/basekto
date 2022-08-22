import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const TimeFrameBtns = ({
    value, setValue,
    timeFrames, getBtnText,
    size, color,
    btnStyles, btnGroupStyles,
}) => {

	const handleChange = (e, newValue) => {
		newValue && setValue(newValue);
	};

    return (

        <ToggleButtonGroup
            size={ size }
            value={ value }
            exclusive
            onChange={ handleChange }
            sx={ btnGroupStyles }
        >
            { Object.keys(timeFrames).map((timeFrame) => (

                <ToggleButton
                    key={ timeFrame }
                    value={ timeFrame }
                    color={ color }
                    sx={ btnStyles }
                >
                    { getBtnText ? getBtnText(timeFrame) : timeFrame }
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default TimeFrameBtns;