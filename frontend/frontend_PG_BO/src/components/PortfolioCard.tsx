import React from "react";
import Typography from "@mui/material/Typography";
import {Investment, Portfolio} from "../data/Portfolio.tsx";
import InvestmentLine from "./InvestmentLine.tsx";

interface PortfolioCardProps {
    portfolio: Portfolio;
}
const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
    //const investments = portfolio.investments;
    return (
        <div>
            {portfolio ? (

                <>
                    <div style={{display: "inline-flex", justifyItems: "center", flexDirection: "row"}}>
                        <div style={{marginRight: "50px"}}><Typography variant="body1">{portfolio.userId}</Typography>
                        </div>
                        <div><p></p></div>
                        <div style={{marginRight: "50px"}}><Typography
                            variant="body1">{portfolio.portfolioSharpeRatio}</Typography>
                        </div>
                        <div><p></p></div>
                        <div style={{marginRight: "50px"}}><Typography
                            variant="body1">{portfolio.portfolioBeta}</Typography></div>
                        <div><p></p></div>


                    </div>
                    <div style={{display: "inline-flex", justifyItems: "center", flexDirection: "row"}}>
                        {portfolio.investments.map((item: Investment, index: number) => {
                            return <InvestmentLine key={index} investment={item} /> }
                            )

                    }

                    </div>

                </>

            ) : (
                <Typography variant="body1">You have no saved portfolios yet</Typography>
            )}



        </div>
    );
};

export default PortfolioCard;