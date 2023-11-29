import React, { useState} from "react";
import SearchBar from "../components/SearchBar";
import AssetSearchTable from "../components/AssetSearchTable.tsx"
//import InstantSearchBar from "../components/InstantSearchBar";

//import AssetResultList from "../components/AssetResultList";
import { Asset } from "../data/AssetType";
import {User} from "../data/UserType.tsx";
import {useUserContext} from "../UserContext.tsx";

const fetchAssetsBySymbol = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/explore?" + urlSearchParams, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        })
        .then(res => res.json().then(data => stateSetter([data])));
}

const fetchAssetsByName = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/exploreByName?" + urlSearchParams, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    }).then(res => res.json().then(data => stateSetter(data)));
}

const fetchSession = (): Promise<Response> => {
    return fetch("http://localhost:8080/api/auth/session", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    });
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
const Functionality: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>();
    //const [current, setCurrent] = useState<User>()
	//const [userInput, setUserInput] = useState<string>("");
    //const [userInstantInput, setUserInstantInput] = useState<string>("");
    const [main, setMain] = useState<Asset>();
    //const [shortList, setShortList] = useState<Asset[]>([]);
    const [shortListAsset, setShortListAsset] = useState<Asset>();

    const {user} = useUserContext();


    //console.log("Main: " + main);
    //console.log("ShortList: " + shortList);
    //console.log("search results (assets): " + assets)

    /*function handleButtonClick() {
        fetchSession().then(res => res.json().then(data => setCurrent(data)))
    }*/

	const handleSearchBySymbol = (searchTerm: string) => {
		fetchAssetsBySymbol(setAssets, searchTerm);

	};
    const handleSearchByName = (searchTerm: string) => {

        fetchAssetsByName(setAssets, searchTerm);
    };



    function handleSetMain(asset: Asset) {
        console.log("userid: " + user.id)

        fetchMain(user.id,asset)
        console.log(asset)
        setMain(asset)

    }

    function handleAddMatcher(asset: Asset) {
        console.log(asset)
        fetchShortListAsset(user.id,asset)
        //setShortList(prevShortList => [...prevShortList, asset]);
        setShortListAsset(asset);
    }




    return <div>
        {/*<button type="button" onClick={handleButtonClick}></button>*/}
        <SearchBar onSaveSearchTerm={handleSearchByName} title={"name"}/>
        <SearchBar onSaveSearchTerm={handleSearchBySymbol} title={"symbol"}/>
        {/*{assets ? <AssetResultList assets={assets} onSelect={handleSetMain} onSave={handleAddMatcher} /> : null}*/}
        {assets? <AssetSearchTable assets={assets} onSetAsMain={handleSetMain} onAddToShortList={handleAddMatcher} /> : null}


    </div>
}
export default Functionality;


