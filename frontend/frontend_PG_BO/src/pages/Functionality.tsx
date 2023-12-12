import React, { useState} from "react";
import SearchBar from "../components/SearchBar";
import AssetSearchTable from "../components/AssetSearchTable.tsx"
import { Asset } from "../data/AssetType";
import {useAppContext} from "../AppContext.tsx";

const fetchAssets = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/explore?" + urlSearchParams, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        })
        .then(res => res.json().then(data => stateSetter(data)));
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
    const {user} = useAppContext();
    const [assets, setAssets] = useState<Asset[]>();

    const [main, setMain] = useState<Asset>();
    const [shortListAsset, setShortListAsset] = useState<Asset>();
    //const [shortList, setShortList] = useState<Asset[]>([]);

	const handleSearch = (searchTerm: string) => {
		fetchAssets(setAssets, searchTerm);
	};

    function handleSetMain(asset: Asset) {
        fetchMain(user.id,asset)
        setMain(asset)

    }

    function handleAddMatcher(asset: Asset) {
        fetchShortListAsset(user.id,asset)
        //setShortList(prevShortList => [...prevShortList, asset]);
        setShortListAsset(asset);
    }

    return     <div>
            <SearchBar onSaveSearchTerm={handleSearch} title={"symbol or name"}/>
            {assets? <AssetSearchTable assets={assets} onSetAsMain={handleSetMain} onAddToShortList={handleAddMatcher} /> : null}
        </div>
}
export default Functionality;


