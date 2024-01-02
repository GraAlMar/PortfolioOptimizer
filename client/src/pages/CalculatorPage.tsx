import React, {useEffect, useState} from "react";
import styles from "./UserSpace.module.css"
import styleC from "../components/Style.module.css";
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
import {styled, TextField} from "@mui/material";
import {
    calculatePorfolioSharpeValue,
    calculatePorfolioBeta,
    calculateMatcherAssetAmountOutOBeta,
    calculateMatcherAssetAmountOutOfSharpeRatio
} from "../calculator.ts";
import {User} from "../data/UserType.tsx";


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

            </ul>
        </nav>
    );
};
const fetchPortfolio = (userId: number, portfolio: Portfolio) => {
    return fetch(`http://localhost:8080/api/portfolios/${userId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolio),
    });

}
const fetchSession = (): Promise<Response> => {
    return fetch("http://localhost:8080/api/auth/session", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    });
}

    //console.log("user: " + user)
const checkSession = (stateSetter: React.Dispatch<React.SetStateAction<User | null>>) => {
    return fetchSession()
        .then(res =>  {
            //console.log(res)
            if (res.ok) {
                return res.json()
            }
            return null;
        })
        .then(data => {console.log("checkSession-setUser: " + data), stateSetter(data)})
    //console.log("initial render user: " + user)
};
const sliderValuesSetterFunction = (calculationType: string, currentUser: User | null, matcherAsset: Asset | null, stateSetter: React.Dispatch<React.SetStateAction<{min: number; max: number}>>) => {
    if (currentUser !== null && currentUser.mainAsset !== undefined && matcherAsset !== null && matcherAsset.beta !== undefined && matcherAsset.sharperatio !== undefined) {

        if (calculationType === 'Beta') {
            const sliderValuesMinMax = currentUser.mainAsset.beta < matcherAsset?.beta ?
                {

                    min: Number(currentUser?.mainAsset?.beta.toFixed(3)) || 0.00,
                    max: Number(matcherAsset?.beta.toFixed(3)) || 0.00
                } : {
                    max: Number(currentUser?.mainAsset?.beta.toFixed(3)) || 0.00,
                    min: Number(matcherAsset?.beta.toFixed(3)) || 0.00

                }
            stateSetter(sliderValuesMinMax);
            return sliderValuesMinMax;
        } else if (calculationType === 'Sharpe Ratio') {
            const sliderValuesMaxMin = currentUser.mainAsset.sharperatio < matcherAsset?.sharperatio ?
                {

                    min: Number(currentUser?.mainAsset?.sharperatio.toFixed(3)) || 0.00,
                    max: Number(matcherAsset?.sharperatio.toFixed(3)) || 0.00
                } : {

                    max: Number(currentUser?.mainAsset?.sharperatio.toFixed(3)) || 0.00,
                    min: Number(matcherAsset?.sharperatio.toFixed(3)) || 0.00
                }
            stateSetter(sliderValuesMaxMin);
            return sliderValuesMaxMin;
        }
    }
}

const StyledButton = styled(Button)(({theme}) => ({
    marginLeft: '10px',
    marginRight: '50px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
}));

const CalculatorPage: React.FC = () => {
    const {user, setUser} = useAppContext();
    const [calculationType, setCalculationType] = useState<'Beta' | 'Sharpe Ratio' | ''>('');
    const [sliderValue, setSliderValue] = useState(0);
    const [matcherAsset, setMatcherAsset] = useState<Asset | null>(null);

    const [sliderValues, setSliderValues] = useState<{ min: number; max: number }>({min: 0.00, max: 0.00});
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [matcherInvestmentAmount, setMatcherInvestmentAmount] = useState<number>(0);
    const [portfolioBeta, setPortfolioBeta] = useState(0)
    const [portfolioSharpeRatio, setPortfolioSharpeRatio] = useState(0)

    console.log("user at CalculatorPage: " + JSON.stringify(user))

    const handleCalculationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "Beta" | "Sharpe Ratio";
        console.log(value)
        setPortfolioBeta(0)
        setPortfolioSharpeRatio(0)
        setCalculationType(value);

        const newSliderValues = sliderValuesSetterFunction(value,user,matcherAsset,setSliderValues)
        setSliderValue(newSliderValues.min)
        console.log("sliderValue: " + newSliderValues.min)
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
        if (!isNaN(value)) {
            setInvestmentAmount(newValue)
        }

    }
    function handleMatcherInvestmentAmountChange(value: number) {
        console.log(value)
        if (!isNaN(value)) {
            if (investmentAmount === 0) {
                const newValue = value;
                setMatcherInvestmentAmount(newValue);
            }
        }


    }

    useEffect( () => {
        console.log(investmentAmount)
        if (user !== undefined && user.mainAsset !== undefined && matcherAsset !== null && matcherAsset.beta !== undefined && matcherAsset.sharperatio !== undefined) {
            if (!isNaN(investmentAmount)) {
                if (calculationType === "Beta") {
                    const newSliderValues = sliderValuesSetterFunction("Beta",user,matcherAsset,setSliderValues)
                    setSliderValue(newSliderValues.min)
                    console.log("sliderValue: " + newSliderValues.min)
                    //setPortfolioSharpeRatio(0)
                    //setMatcherInvestmentAmount(0)

                    const newMatcherInvestmentAmount = calculateMatcherAssetAmountOutOBeta(investmentAmount, portfolioBeta, user.mainAsset.beta, matcherAsset.beta);
                    console.log(newMatcherInvestmentAmount)
                    setMatcherInvestmentAmount(Number(newMatcherInvestmentAmount.toFixed(2)));
                    console.log(investmentAmount * user.mainAsset.sharperatio)
                    console.log(newMatcherInvestmentAmount * matcherAsset.sharperatio)
                    //console.log(((investmentAmount * user.mainAsset.sharperatio) + (newMatcherInvestmentAmount * matcherAsset.sharperatio))/ (investmentAmount + newMatcherInvestmentAmount))
                    const newPortfolioSharpeRatio = calculatePorfolioSharpeValue(
                        investmentAmount, newMatcherInvestmentAmount,  user.mainAsset.sharperatio, matcherAsset.sharperatio)


                    //const newPortfolioSharpeRatio = ((investmentAmount * user.mainAsset.sharperatio) + (newMatcherInvestmentAmount * matcherAsset.sharperatio))/ (investmentAmount + newMatcherInvestmentAmount)
                    console.log(newPortfolioSharpeRatio)
                    if (!isNaN(newPortfolioSharpeRatio)) {
                        setPortfolioSharpeRatio(Number(newPortfolioSharpeRatio.toFixed(3)))
                    } else {setPortfolioSharpeRatio(0)}


                    setTotalAmount(Number((newMatcherInvestmentAmount + investmentAmount).toFixed(2)))
                } else if (calculationType === "Sharpe Ratio") {
                    const newSliderValues = sliderValuesSetterFunction("Sharpe Ratio",user,matcherAsset,setSliderValues)
                    setSliderValue(newSliderValues.min)
                    console.log("sliderValue: " + newSliderValues.min)
                    //setPortfolioSharpeRatio(0)
                    //setMatcherInvestmentAmount(0)

                    const newMatcherInvestmentAmount = calculateMatcherAssetAmountOutOfSharpeRatio(
                        investmentAmount, portfolioSharpeRatio, user.mainAsset.sharperatio, matcherAsset.sharperatio);
                    console.log(newMatcherInvestmentAmount)
                    setMatcherInvestmentAmount(Number(newMatcherInvestmentAmount.toFixed(2)));

                    const newPortfolioBeta = calculatePorfolioBeta(
                        investmentAmount, matcherInvestmentAmount, user.mainAsset.beta, matcherAsset.beta)
                    console.log(newPortfolioBeta)
                    if (!isNaN(newPortfolioBeta)) {
                        setPortfolioBeta(Number(newPortfolioBeta.toFixed(3)))
                    } else {setPortfolioBeta(0)}

                    setTotalAmount(Number((newMatcherInvestmentAmount + investmentAmount).toFixed(2)))
                }
            }
        }

        //console.log("useEffect-matcherAmount: " + matcherInvestmentAmount)
    }, [investmentAmount, matcherAsset, matcherInvestmentAmount])
    const handleDropdownSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const chosenMatcherName = event.target.value as string;
        const chosenMatcher = user?.shortList?.shortList.find(asset => asset.name === chosenMatcherName) || null;
        setMatcherAsset(chosenMatcher);
    }
    if (!user) {
        return <div>please log in</div>
    }
    //async function handleSavePortfolio() {
    function handleSavePortfolio() {
        const userId = user?.id
        console.log(userId)
        if (!user || !user.id || !user.mainAsset || !matcherAsset) {
            return;
        }
        const investments = [
            {
                asset: user.mainAsset,
                amount: investmentAmount,
            },
            {
                asset: matcherAsset || undefined,
                amount: matcherInvestmentAmount,
            },
        ];
        const portfolio: Portfolio = {
            userId: userId,
            investments: investments,
            portfolioBeta: portfolioBeta,
            portfolioSharpeRatio: portfolioSharpeRatio,
        }
        fetchPortfolio(user.id,portfolio).then(() => {
            checkSession(setUser).then(() => resetValues())

        })
        /*await fetchPortfolio(user.id, portfolio)
        await checkSession(setUser)*/
        //resetValues()
    }
    const resetValues = () => {
        setCalculationType("");
        setSliderValues({min: 0.00, max: 0.00});
        setSliderValue(sliderValues.min)
        setTotalAmount(0);
        setInvestmentAmount(0);
        setMatcherInvestmentAmount(0);
        setPortfolioBeta(0);
        setPortfolioSharpeRatio(0);
    };
    function handleClearButtonClick() {


        setMatcherAsset(null);
        resetValues();
        console.log(sliderValue)
        console.log(portfolioBeta)
        console.log(portfolioSharpeRatio)

    }

    return (
        <>
            <div><p></p></div>
            <div>
                <NavBar/>
            </div>
            <div className={styleC.divContainer}>
                <div className={styleC.cardContainer}>

                    <div><p></p></div>
                    <div className={styleC.card}>
                        <div>
                            <h2>Calculate: </h2>
                            <p>Please choose which financial indicator to compute</p>
                        </div>

                        <RadioButtons calculationType={calculationType}
                                      handleCalculationChange={handleCalculationChange}/>

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
                    </div>

                    <div><p></p></div>

                    <div className={styleC.card}>
                        <div><h3>Your main asset: </h3></div>
                        {user.mainAsset ? (
                            <>
                                <MainDisplay asset={user.mainAsset}/>
                                <div><p></p></div>
                                <div><AssetDetailsLine beta={user.mainAsset.beta}
                                                       sharpeRatio={user.mainAsset.sharperatio ?? 0}
                                                       amount={investmentAmount}
                                                       handleAmountChange={handleInvestmentAmountChange}/>
                                </div>
                            </>) : (
                            <Typography variant="body1">You have not yet chosen a main asset</Typography>
                        )}
                    </div>

                    <div><p></p></div>

                    <div className={styleC.card}>
                        <div><h3>Asset to match: </h3></div>

                        {user.shortList?.shortList?.length && user.mainAsset ?
                            (<>
                                <MatcherSelection
                                    matcher={matcherAsset}
                                    matchers={user.shortList?.shortList ? user.shortList?.shortList : []}
                                    onSelectChange={handleDropdownSelectChange}/>
                                {matcherAsset !== null ? (
                                        <>
                                            <div><p></p></div>

                                            <AssetDetailsLine
                                                beta={matcherAsset.beta}
                                                sharpeRatio={matcherAsset.sharperatio ?? 0}
                                                amount={matcherInvestmentAmount}
                                                handleAmountChange={handleMatcherInvestmentAmountChange}
                                            /></>) :
                                    <p></p>}
                            </>) :
                            (<div>to match an asset please create shortlist</div>)}
                    </div>

                    <div><p></p></div>

                    <div className={`${styleC.card} ${styleC.buttonContainer}`}>
                        <StyledButton onClick={handleSavePortfolio} color={"primary"}>Save Portfolio</StyledButton>
                        <StyledButton onClick={handleClearButtonClick} color="secondary">Clear</StyledButton>
                    </div>
                    <div><p></p></div>
                </div>
            </div>
        </>)
}

export default CalculatorPage;

