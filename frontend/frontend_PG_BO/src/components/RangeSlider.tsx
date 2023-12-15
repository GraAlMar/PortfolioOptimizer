import React from 'react';
import Typography from "@mui/material/Typography";
import { Slider, styled } from "@mui/material";

interface SliderProps {
    min: number;
    max: number;
    value: number;
    step: number;
    onChange: (newValue: number) => void;
}

const RangeSliderContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const MinMaxContainer = styled('div')({
    width: '20%',
    textAlign: 'center',
});

const StyledSlider = styled(Slider)({
    width: '60%',
    marginLeft: '20px',
    marginRight: '20px',
});

const RangeSlider: React.FC<SliderProps> = ({ min, max, value, onChange ,step}) => {
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            onChange(newValue);
        }
    };
    return (
        <RangeSliderContainer>
            <MinMaxContainer>
                <Typography variant="caption">{min}</Typography>
            </MinMaxContainer>
            <StyledSlider value={value}
            min={min}
            max={max}
                          step={step}
            onChange={handleSliderChange}
            valueLabelDisplay="auto" />
            <MinMaxContainer>
                <Typography variant="caption">{max}</Typography>
            </MinMaxContainer>
        </RangeSliderContainer>
    );
};

export default RangeSlider;
