import React from 'react';
import {TextField} from "@mui/material";

interface AssetDetailsLineProps {
    beta: number;
    sharpeRatio: number ;
    amount: number;

    handleAmountChange: (value: number) => void;
}

const AssetDetailsLine: React.FC<AssetDetailsLineProps> = ({
                 beta,
                 sharpeRatio,
                 amount,
                 handleAmountChange,
                 }) => {
    return (
        <div>
            <TextField
                label="Beta"
                type="text"
                value={beta}

            />
            <TextField
                label="Sharpe Ratio"
                type="text"
                value={sharpeRatio}

            />
            <TextField
                label="Amount in USD"
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
            />
        </div>
    );
};

export default AssetDetailsLine;
