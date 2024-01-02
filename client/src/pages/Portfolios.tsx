import React, {useEffect, useState} from "react";
import styles from "./UserSpace.module.css"
import {NavLink} from "react-router-dom";
import {Portfolio} from "../data/Portfolio.tsx";
import {useAppContext} from "../AppContext.tsx";
import PortfolioCard from "../components/PortfolioCard.tsx";
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

const fetchPortfolios = (userId: number, stateSetter: React.Dispatch<React.SetStateAction<Portfolio[]>>): Promise<void> => {
    return fetch(`http://localhost:8080/api/portfolios/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    })
        .then(res => res.json().then(data =>
        {console.log(data)
            stateSetter(data)
        }));
}
const Portfolios: React.FC = () => {
    const {user} = useAppContext()
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])

    useEffect(() => {
        if (user !== undefined) {
            fetchPortfolios(user.id, setPortfolios);
        }
        console.log()
    }, [user])

    return (
        <>
            <div><p>       </p></div>
        <div>
            <NavBar/>
        </div>
            <div><h2>Your portfolios:</h2></div>
            <div>
                {
                    portfolios.map((item: Portfolio) => {
                        return <PortfolioCard key={item.id} portfolio={item}/>
                    })
                }
            </div>

    </>)
}
export default Portfolios;