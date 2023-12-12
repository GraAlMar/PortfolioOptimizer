/*import React from 'react';
import Typography from "@mui/material/Typography";
import {Slider} from "@mui/material";

interface SliderProps {
    min: number;
    max: number;
    onChange: (event: any , newValue: number | number[]) => void;
}

const RangeSlider: React.FC<SliderProps> = ({ min, max, onChange }) => {
    return (
        <div>
            <Typography variant="caption">{min}</Typography>
            <Slider valueLabelDisplay="auto" min={min} max={max} onChange={onChange} />
            <Typography variant="caption">{max}</Typography>
        </div>
    );
};

export default RangeSlider;*/


import React from 'react';
import Typography from "@mui/material/Typography";
import { Slider, styled } from "@mui/material";

interface SliderProps {
    min: number;
    max: number;
    onChange: (event: any , newValue: number | number[]) => void;
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

const RangeSlider: React.FC<SliderProps> = ({ min, max, onChange }) => {
    return (
        <RangeSliderContainer>
            <MinMaxContainer>
                <Typography variant="caption">{min}</Typography>
            </MinMaxContainer>
            <StyledSlider valueLabelDisplay="auto" min={min} max={max} onChange={onChange} />
            <MinMaxContainer>
                <Typography variant="caption">{max}</Typography>
            </MinMaxContainer>
        </RangeSliderContainer>
    );
};

export default RangeSlider;


