import React from "react";
import styles from "./UserSpace.module.css"
import {NavLink} from "react-router-dom";
//import {Outlet} from "@mui/icons-material";

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/assets">Assets</NavLink>
                </li>
                <li className={styles.liOther}>
                    <NavLink to="/userspace/calculator">Beta Calculator</NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink to="/userspace/portfolios">Portfolios</NavLink>
                </li>

            </ul >
        </nav>
    );
};
const Portfolios: React.FC = () => {
    return (
        <>
            <div><p>       </p></div>
        <div>
            <NavBar/>
        </div>
    </>)
}
export default Portfolios;