import React, {useState} from "react";
import styles from "./UserSpace.module.css"
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {grey} from "@mui/material/colors";
import {useUserContext} from "../UserContext.tsx";
//import {Outlet} from "@mui/icons-material";
const greyTheme = createTheme({ palette: { primary: grey } })
const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <NavLink to="/userspace/assets">Assets</NavLink>
                </li>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/calculator">Beta Calculator</NavLink>
                </li>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/portfolios">Portfolios</NavLink>
                </li>

            </ul >
        </nav>
    );
};
const UserAssetsPage: React.FC = () => {
    const {user} = useUserContext();
    const [mainVisible, setMainVisible] = useState(false)
    const [shortListVisible, setShortListVisible] = useState(false)
    const [searchVisible, setSearchVisible] = useState(false)

    function handleShowMain() {
        setMainVisible(true)
    }

    function handleShowShortList() {
        setShortListVisible(true)
    }

    return (
        <>
            <div><p>       </p></div>
        <div>
        <NavBar/>
    </div>
            <div className={styles.buttonContainer}>
                <ThemeProvider theme={greyTheme}><Button onClick={handleShowMain}>Show main</Button></ThemeProvider>
                <ThemeProvider theme={greyTheme}><Button onClick={handleShowShortList}>Show shortlist</Button></ThemeProvider>
                <ThemeProvider theme={greyTheme}><Button onClick={() => setSearchVisible()}>Search</Button></ThemeProvider>

            </div>
            </>)
}

export default UserAssetsPage;