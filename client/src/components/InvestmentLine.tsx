import Typography from "@mui/material/Typography";
import React from "react";
import {Investment} from "../data/Portfolio.tsx";

interface InvestmentLineProps {
    investment: Investment;
}

const InvestmentLine: React.FC<InvestmentLineProps> = ( {investment} ) => {
    return (
        <>
            <div style={{marginRight: "50px"}}><Typography variant="body1">{investment.asset.name}</Typography>
            </div>
            <div style={{marginRight: "50px"}}><Typography variant="body1">{investment.asset.abbreviation}</Typography>
            </div>
            <div style={{marginRight: "50px"}}><Typography variant="body1">{}</Typography>{investment.asset.sharperatio}
            </div>
            <div style={{marginRight: "50px"}}><Typography variant="body1">{}</Typography>{investment.asset.beta}
            </div>
            <div style={{marginRight: "50px"}}><Typography variant="body1">{}</Typography>{investment.amount}
            </div>
        </>
    )
}
export default InvestmentLine;