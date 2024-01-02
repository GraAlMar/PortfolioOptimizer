import React from "react";


interface NumberFieldProps {
    min: number;
    step: number;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const NumberField: React.FC<NumberFieldProps> = ({
                                                     min,
                                                     step,
                                                     label,
                                                     value,
                                                     onChange,
                                                 }) => {
    return (
        <div className="number-field">
            <label>{label}</label>
            <input
                type="number"
                min={min}
                step={step}
                value={value}
                onChange={onChange}
            />
            <span>{value}</span>
        </div>
    );
};


export default NumberField;