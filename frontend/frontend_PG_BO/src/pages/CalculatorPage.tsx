import React, {useState} from "react";
import styles from "./UserSpace.module.css"
import {NavLink} from "react-router-dom";
import {Asset} from "../data/AssetType.tsx";
import RadioButtons from "../components/RadioButtons.tsx";
import RangeSlider from "../components/RangeSlider.tsx";
import MainDisplay from "../components/MainDisplay.tsx";
import {useAppContext} from "../AppContext.tsx";
import AssetDetailsLine from "../components/AssetDetailsLine.tsx";
import MatcherSelection from "../components/MatcherSelection.tsx";
import Typography from "@mui/material/Typography";



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
const CalculatorPage: React.FC = () => {
    const {user,shortList} = useAppContext();
    const [calculationType, setCalculationType] = useState<'Beta' | 'Sharpe Ratio' | ''>('');
    //const [mainAsset, setMainAsset] = useState<Asset | null>(null);
    const [matcherAsset, setMatcherAsset] = useState<Asset | null>(null);
    //const [matcherAssets, setMatcherAssets] = useState<Asset[] >([]);

    const [sliderValues, setSliderValues] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [matcherInvestmentAmount,setMatcherInvestmentAmount] = useState<number>(0);
    console.log(shortList)
    console.log(user?.mainAsset)
    function handleCalculationChange() {

    }

    function handleSliderChange() {

    }

    function handleInvestmentAmountChange() {

    }

    function handleMatcherInvestmentAmountChange() {

    }

    const handleDropdownSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const chosenMatcherName = event.target.value as string;
        const chosenMatcher = user?.shortList?.shortList.find(asset => asset.name === chosenMatcherName) || null;
        setMatcherAsset(chosenMatcher);
    }

    if (!user) {
        return <div>please log in</div>
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
            <div className={styles.sliderContainer}><RangeSlider min={sliderValues.min} max={sliderValues.max} onChange={handleSliderChange}/></div>
            <div><p>       </p></div>
            <div><h3>Your main asset: </h3></div>
            {user.mainAsset ? (<><MainDisplay asset={user.mainAsset}/>
                <AssetDetailsLine beta={user.mainAsset.beta} sharpeRatio={user.mainAsset.sharperatio ?? 0} amount={investmentAmount} handleAmountChange={handleInvestmentAmountChange}/></>) : (
                <Typography variant="body1">You have not yet chosen a main asset</Typography>
                )}
            <div><p>       </p></div>
            <div><h3>Asset to match: </h3></div>

            {user.shortList?.shortList.length > 0 && user.mainAsset ?
                (<>
                    <MatcherSelection
                        matcher={matcherAsset}
                        matchers={user.shortList?.shortList}
                        onSelectChange={handleDropdownSelectChange}/>
                    {matcherAsset !== null ? (<AssetDetailsLine
                        beta={matcherAsset.beta}
                        sharpeRatio={matcherAsset.sharperatio ?? 0}
                        amount={matcherInvestmentAmount}
                        handleAmountChange={handleMatcherInvestmentAmountChange}/>) : <p></p>}
                </>) :
                (<div>to match an asset please create shortlist</div>)}
            {/* Button: Save */}
            {/* Button: Clear */}
        </div>
    </>)
}

export default CalculatorPage;

