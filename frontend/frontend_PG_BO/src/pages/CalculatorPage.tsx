import React, {useEffect, useState} from "react";
import styles from "./UserSpace.module.css"
import cardStyles from "./Calculator.module.css";
import {NavLink} from "react-router-dom";
import {Asset} from "../data/AssetType.tsx";
import {Portfolio} from "../data/Portfolio.tsx"
import RadioButtons from "../components/RadioButtons.tsx";
import MainDisplay from "../components/MainDisplay.tsx";
import {useAppContext} from "../AppContext.tsx";
import AssetDetailsLine from "../components/AssetDetailsLine.tsx";
import MatcherSelection from "../components/MatcherSelection.tsx";
import Typography from "@mui/material/Typography";
import RangeSlider from "../components/RangeSlider.tsx";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
//import {Number} from "@typescript-eslint/eslint-plugin";



const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/assets">Assets</NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink to="/userspace/calculator">Beta Calculator</NavLink>
                </li>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/portfolios">Portfolios</NavLink>
                </li>

            </ul >
        </nav>
    );
};
const fetchPortfolio = (userId: number, portfolio: Portfolio) => {
    fetch(`http://localhost:8080/api/portfolios/${userId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( portfolio ),
    })
}

const CalculatorPage: React.FC = () => {
    const {user,setUser} = useAppContext();
    const [calculationType, setCalculationType] = useState<'Beta' | 'Sharpe Ratio' | ''>('');
    const [sliderValue, setSliderValue] = useState(0);
    const [matcherAsset, setMatcherAsset] = useState<Asset | null>(null);

    const [sliderValues, setSliderValues] = useState<{ min: number; max: number}>({ min: 0.00, max: 0.00 });
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [matcherInvestmentAmount,setMatcherInvestmentAmount] = useState<number>(0);
    const [portfolioBeta,setPortfolioBeta] = useState(0)
    const [portfolioSharpeRatio,setPortfolioSharpeRatio] = useState(0)

    const handleCalculationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "Beta" | "Sharpe Ratio" ;
        console.log(value)
        setCalculationType(value);
        //console.log(calculationType)
        /*if (calculationType === "Beta" && value === "Beta") {
            setCalculationType('');
            resetValues();
        }*/
        /*if (calculationType === "Beta" || calculationType === "Sharpe Ratio") {
            setCalculationType('');
            resetValues();
        }*/

        if (value === 'Beta') {
            setSliderValues(
                user?.mainAsset?.beta < matcherAsset?.beta ?
                {

                min: Number(user?.mainAsset?.beta.toFixed(3)) || 0.00,
                max: Number(matcherAsset?.beta.toFixed(3)) || 0.00
            } : {
                max: Number(user?.mainAsset?.beta.toFixed(3)) || 0.00,
                min: Number(matcherAsset?.beta.toFixed(3)) || 0.00

                    });
        } else if (value === 'Sharpe Ratio') {
            setSliderValues(user?.mainAsset?.sharperatio < matcherAsset?.sharperatio ?
                {

                    min: Number(user?.mainAsset?.sharperatio.toFixed(3)) || 0.00,
                    max: Number(matcherAsset?.sharperatio.toFixed(3)) || 0.00
                } : {

                    max: Number(user?.mainAsset?.sharperatio.toFixed(3)) || 0.00,
                    min: Number(matcherAsset?.sharperatio.toFixed(3)) || 0.00
                });
        }
    };


    const handleSliderChange = (newValue: number) => {
        setSliderValue(newValue);

        if (calculationType === 'Beta') {
            setPortfolioBeta(newValue);
        } else if (calculationType === 'Sharpe Ratio') {
            setPortfolioSharpeRatio(newValue);
        }
    };
    function handleTotalAmountChange(value: number) {
        const newValue = value;
        setTotalAmount(newValue);
    }

    function handleInvestmentAmountChange(value: number) {
        const newValue = value;
        setInvestmentAmount(newValue);
    }

    function handleMatcherInvestmentAmountChange(value: number) {
        if (investmentAmount === 0) {
            const newValue = value;
            setMatcherInvestmentAmount(newValue);
        }

    }
    useEffect(() => {
        if (calculationType === "Beta") {
            const newValue = (investmentAmount * (portfolioBeta - user?.mainAsset?.beta)) / (matcherAsset?.beta - portfolioBeta);
            console.log(newValue)
            setMatcherInvestmentAmount(Number(newValue.toFixed(2)));
            const newPSValue = ((investmentAmount * user?.mainAsset?.sharperatio) + (newValue * matcherAsset?.sharperatio))/ (investmentAmount + newValue)
            setPortfolioSharpeRatio(Number(newPSValue.toFixed(3)))
            setTotalAmount(Number((newValue + investmentAmount).toFixed(2)))
        } else
        if (calculationType === "Sharpe Ratio") {
            const newValue = (investmentAmount * (portfolioSharpeRatio - user?.mainAsset?.sharperatio)) / (matcherAsset?.sharperatio - portfolioSharpeRatio);
            setMatcherInvestmentAmount(Number(newValue.toFixed(2)));
            const newPBValue = ((investmentAmount * user?.mainAsset?.beta) + (newValue * matcherAsset?.beta))/ (investmentAmount + newValue)
            setPortfolioSharpeRatio(Number(newPBValue.toFixed(3)))
            setTotalAmount(Number((newValue + investmentAmount).toFixed(2)))

        }
        console.log("useEffect-matcherAmount: " + matcherInvestmentAmount)
    }, [investmentAmount])
    const handleDropdownSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const chosenMatcherName = event.target.value as string;
        const chosenMatcher = user?.shortList?.shortList.find(asset => asset.name === chosenMatcherName) || null;
        setMatcherAsset(chosenMatcher);
    }

    if (!user) {
        return <div>please log in</div>
    }

    function handleSavePortfolio() {
        const userId = user?.id
        console.log(userId)
        if (!user || !user.id ||!user.mainAsset || !matcherAsset) {
            return;
        }
        const investments = [
        {
            asset: user?.mainAsset,
            amount: investmentAmount,
        },
        {
            asset: matcherAsset || undefined,
            amount: matcherInvestmentAmount,
        },
    ];
        const portfolio : Portfolio = {
            userId: userId,
            investments: investments,
            portfolioBeta: portfolioBeta,
            portfolioSharpeRatio: portfolioSharpeRatio,
        }
        fetchPortfolio(user.id,portfolio)
    }

    const resetValues = () => {
        setCalculationType("");
        setSliderValues({ min: 0.00, max: 0.00 });
        setSliderValue(0)
        setTotalAmount(0);
        setInvestmentAmount(0);
        setMatcherInvestmentAmount(0);
        setPortfolioBeta(0);
        setPortfolioSharpeRatio(0);
    };
    function handleClearButtonClick() {



            setMatcherAsset(null);
            resetValues();

    }

    return (
    <>
        <div><p>       </p></div>
        <div>
            <NavBar/>
        </div>
        <div>
            <div>
                <h2>Calculate: </h2>
                <p>Please choose which financial indicator to compute</p>
            </div>
            <RadioButtons calculationType={calculationType} handleCalculationChange={handleCalculationChange}/>
            <div>
                <p>Please use the slider to set the value for the portfolio</p>
            </div>
            <div className={styles.sliderContainer}>
                <RangeSlider
                    min={sliderValues.min}
                    max={sliderValues.max}
                    step={0.001}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
            </div>
            <div><p></p></div>
            <div>
                <TextField
                    label="Portfolio Beta"
                    type="text"
                    value={portfolioBeta}

                />
                <TextField
                    label="Portfolio Sharpe Ratio"
                    type="text"
                    value={portfolioSharpeRatio}

                />

                <TextField
                    label="Total Investment in Portfolio:"

                    type="number"
                    value={totalAmount}
                    onChange={(e) => handleTotalAmountChange(parseFloat(e.target.value))}
                />
            </div>

            <div><h3>Your main asset: </h3></div>
            {user.mainAsset ? (<><MainDisplay asset={user.mainAsset}/>
                <AssetDetailsLine beta={user.mainAsset.beta} sharpeRatio={user.mainAsset.sharperatio ?? 0}
                                  amount={investmentAmount} handleAmountChange={handleInvestmentAmountChange}/></>) : (
                <Typography variant="body1">You have not yet chosen a main asset</Typography>
            )}
            <div><p></p></div>
            <div><h3>Asset to match: </h3></div>

            {user.shortList?.shortList?.length && user.mainAsset ?
                (<>
                    <MatcherSelection
                        matcher={matcherAsset}
                        matchers={user.shortList?.shortList ? user.shortList?.shortList : []}
                        onSelectChange={handleDropdownSelectChange}/>
                    {matcherAsset !== null ? (<AssetDetailsLine
                        beta={matcherAsset.beta}
                        sharpeRatio={matcherAsset.sharperatio ?? 0}
                        amount={matcherInvestmentAmount}
                        handleAmountChange={handleMatcherInvestmentAmountChange}/>) : <p></p>}
                </>) :
                (<div>to match an asset please create shortlist</div>)}
            <div><p></p></div>
            <Button onClick={handleSavePortfolio} color={"primary"}>Save Portfolio</Button>
            {/* Button: Clear */}
            <div>
                <Button onClick={handleClearButtonClick} color="secondary">Clear</Button>
            </div>
            <div><p></p></div>
        </div>
    </>)
}

export default CalculatorPage;

