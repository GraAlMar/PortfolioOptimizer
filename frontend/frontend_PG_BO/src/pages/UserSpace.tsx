import React from "react";
import {NavLink} from "react-router-dom";
//import {Link, NavLink, Outlet} from "react-router-dom";

import styles from "./UserSpace.module.css"
import {useAppContext} from "../AppContext.tsx";
//import {Outlet} from "@mui/icons-material";

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <NavLink to="/userspace/assets">Assets</NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink to="/userspace/calculator">Beta Calculator</NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink to="/userspace/portfolios">Portfolios</NavLink>
                </li>

            </ul >
        </nav>
    );
};
const UserSpace: React.FC = () => {
    const {user} = useAppContext()

    return (
        <>
            <div><p>       </p></div>
        <div className={styles.divContainer}>

            <NavBar/>
            {/*<nav>
                <NavLink to="search">Assets</NavLink>
                <NavLink to="calculator">Beta-Calculator</NavLink>
                <NavLink to="portfolios">Portfolios</NavLink>

            </nav>
            <Outlet/>*/}
            <div><h2>Hello {user.username} !</h2></div>
        </div>
        </>
    )
}
export default UserSpace;