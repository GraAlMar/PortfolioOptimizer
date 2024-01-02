import React from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";


interface RadioButtonsProps {
    calculationType: string;
    handleCalculationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ calculationType, handleCalculationChange }) => {
    return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="calculationType" name="calculationType" value={calculationType} onChange={handleCalculationChange}>
                <FormControlLabel value="Beta" control={<Radio />} label="Beta" />
                <FormControlLabel value="Sharpe Ratio" control={<Radio />} label="Sharpe Ratio" />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtons;
