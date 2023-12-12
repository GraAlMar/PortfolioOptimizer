import React, {useState} from "react";
import styles from "./UserSpace.module.css"
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {grey} from "@mui/material/colors";
import {useAppContext} from "../AppContext.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {Asset} from "../data/AssetType.tsx";
import AssetSearchTable from "../components/AssetSearchTable.tsx";
import ShortListTable from "../components/ShortListTable.tsx";
import {User} from "../data/UserType.tsx";
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

const fetchAssets = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, stateSetter2: React.Dispatch<React.SetStateAction<boolean>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/explore?" + urlSearchParams, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    })
        /*.then(res =>
        res.json()*/
        .then(res =>  {
            //console.log(res)
            if (res.ok) {
                return res.json()
            }
            return null;
        })
        .then(data => {console.log("settingState"); stateSetter2(false); stateSetter(data)});
}
const fetchMain = (userId: number, asset: Asset) => {
    fetch(`http://localhost:8080/api/users/${userId}/main`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( asset ),
    })
}

const fetchShortListAsset = (userId: number, asset: Asset) => {
    fetch(`http://localhost:8080/api/users/${userId}/shortlist`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(asset ),
    })
}
async function fetchDeleteShortListAsset(userId: number, asset: Asset, stateSetter: React.Dispatch<React.SetStateAction<User>>, stateSetter2: React.Dispatch<React.SetStateAction<Asset[]>>) {
    await fetch(`http://localhost:8080/api/users/${userId}/shortlist`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(asset ),
    })
    //await fetchSession(stateSetter, stateSetter2)
}
const UserAssetsPage: React.FC = () => {
    const {user, setShortList} = useAppContext();
    const [assets, setAssets] = useState<Asset[]>([])
    const [main, setMain] = useState<Asset>();
    //const [shortListAsset, setShortListAsset] = useState<Asset>();
    //const [shortList, setShortList] = useState<Asset[]>([]);
    const [mainVisible, setMainVisible] = useState(false)
    const [shortListVisible, setShortListVisible] = useState(false)
    const [searchVisible, setSearchVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    //let mainAssetRender : Asset[] = main !== undefined ? [main] : []
    //console.log(mainAssetRender[0].name)
    console.log("user: " + user)

    function handleShowMain() {
        setMainVisible(true)
        setShortListVisible(false);
        setSearchVisible(false)
    }

    function handleShowShortList() {
        setShortListVisible(true)
        setMainVisible(false);
        setSearchVisible(false);
        console.log(user?.shortList?.shortList)

    }
    const handleSearch = (searchTerm: string) => {
        setLoading(true)
        fetchAssets(setAssets, setLoading, searchTerm);

    };


    function handleSetMain(asset: Asset) {
        if (user !== null && user.id !== undefined) {
            fetchMain(user.id,asset)
            setMain(asset)
        }


    }

    function handleAddMatcher(asset: Asset) {
        if (user !== null && user.id !== undefined) {
            fetchShortListAsset(user.id, asset)
            setShortList((prevShortList: Asset[]) => {
                return [...prevShortList as Asset[], asset];
            });
            //setShortListAsset(asset);
        }
    }



    function handleDeleteFromShortList(asset: Asset) {
        if (user !== null && user.id !== undefined) {

            setShortList((prevShortList: Asset[]) => {
                return [...(prevShortList as Asset[]).filter(entry => entry !== asset)];
            });
            //setShortListAsset(asset);
        }
    };
    return (
        <>
        <div>
            <p>       </p>
        </div>
        <div>
            <NavBar/>
        </div>
        <div>
            {searchVisible && (
                <>
                <div className={styles.buttonContainer}>
                    <ThemeProvider theme={greyTheme}><Button onClick={handleShowMain}>Show main</Button></ThemeProvider>
                    <ThemeProvider theme={greyTheme}><Button onClick={handleShowShortList}>Show shortlist</Button></ThemeProvider>
                    <ThemeProvider theme={greyTheme}><Button onClick={() => setSearchVisible(false)}>Hide Search</Button></ThemeProvider>
                </div>
                <SearchBar onSaveSearchTerm={handleSearch} title={"symbol or name"} />
                    <div>
                        <p>       </p>
                    </div>
                    {loading ? <div>Loading ...</div> : (assets  && assets.length > 0 ? <AssetSearchTable assets={assets} onSetAsMain={handleSetMain} onAddToShortList={handleAddMatcher} /> : null)}
                </>
                )
            }
            {!searchVisible && mainVisible && (

                <>
                    <div className={styles.buttonContainer}>
                        <ThemeProvider theme={greyTheme}><Button onClick={() => setMainVisible(false)}>Hide main</Button></ThemeProvider>
                        <ThemeProvider theme={greyTheme}><Button onClick={handleShowShortList}>Show shortlist</Button></ThemeProvider>
                        <ThemeProvider theme={greyTheme}><Button onClick={() => setSearchVisible(true)}>Search</Button></ThemeProvider>                    </div>
                <div>{user?.mainAsset?.name}</div>
                </>
            )}
            {!searchVisible && !mainVisible && shortListVisible && (
                <>
                    <div className={styles.buttonContainer}>
                        <ThemeProvider theme={greyTheme}><Button onClick={handleShowMain}>Show main</Button></ThemeProvider>
                        <ThemeProvider theme={greyTheme}><Button onClick={() => setShortListVisible(false)}>Hide Shortlist</Button></ThemeProvider>
                        <ThemeProvider theme={greyTheme}><Button onClick={() => setSearchVisible(true)}>Search</Button></ThemeProvider>
                    </div>
                    <div>shortList

                        <ShortListTable assets={user?.shortList?.shortList} onSetAsMain={handleSetMain} onDeleteFromShortList={handleDeleteFromShortList}
                            />
                    </div>

                </>

            )}
            {!searchVisible && !mainVisible && !shortListVisible && (
                <div className={styles.buttonContainer}>
                    <ThemeProvider theme={greyTheme}><Button onClick={handleShowMain}>Show main</Button></ThemeProvider>
                    <ThemeProvider theme={greyTheme}><Button onClick={handleShowShortList}>Show shortlist</Button></ThemeProvider>
                    <ThemeProvider theme={greyTheme}><Button onClick={() => setSearchVisible(true)}>Search</Button></ThemeProvider>
                </div>)}
            </div>
            </>)
}

export default UserAssetsPage;