import React, { useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import InstantSearchBar from "../components/InstantSearchBar";

import AssetResultList from "../components/AssetResultList";
import { Asset } from "../data/AssetType";

const fetchAssetsBySymbol = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/explore?" + urlSearchParams).then(res => res.json().then(data => stateSetter(data)));
}

const fetchAssetsByName = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchString", queryParams)
    return fetch("http://localhost:8080/api/exploreByName?" + urlSearchParams).then(res => res.json().then(data => stateSetter(data)));
}

const Functionality: React.FC = () => {
    const [assets, setAssets] = useState<Asset[] | Asset>();
	const [userInput, setUserInput] = useState<string>("");
    const [userInstantInput, setUserInstantInput] = useState<string>("");

	useEffect(() => {
		fetchAssetsBySymbol(setAssets, userInput);
	}, []);

	const handleSearch = (searchTerm: string) => {
		setUserInput(searchTerm);
	};

    useEffect(() => {
		fetchAssetsByName(setAssets, userInput);
	}, [userInstantInput]);
    
    const handleChange = (e) => {
		setUserInstantInput(e.target.value);
	};
    return (
        <div>
            {/*
            input of user search
            */}
            <InstantSearchBar handleChange={handleChange} />
            <SearchBar onSaveSearchTerm={handleSearch} />
			<AssetResultList assets={assets} />
            {/*
            todo:
            */}
        </div>
    )
}
export default Functionality;



// import React from "react";
// import { useState , useEffect} from "react";
// import SearchBar from "../components/SearchBar";
// import AssetResultList from "../components/AssetResultList"
// import { Asset } from "../data/AssetType";

// const fetchAssets = (stateSetter: Asset, queryParams = "") => {
//     let urlPart
//     if (queryParams !== "") {
//         urlPart = "?searchString=" + queryParams
//     }
//     return fetch("http://localhost:8080/api/explore" + urlPart, {}).then(res => res.json().then(data => stateSetter(data)))
// }

// const Functionality: React.FC = () => {
//     const [assets, setAssets] = useState();
// 	const [userInput, setUserInput] = useState("");

// 	useEffect(() => {
// 		fetchAssets(setAssets, userInput);
// 	}, [userInput]);

// 	const handleChange = (e) => {
// 		setUserInput(e.target.value);
// 	};


//     return (
//         <div>
//             // input of user's existing asset(s)
            
//             <SearchBar handleChange={handleChange} />
// 			<AssetResultList assets={assets} />

//             // form for search given certain beta and/or sharperatio and specification of how many assets to combine with what ratios
//             // list of search-results with add to portfolio-functionality 

//         </div>
//     )
// }
// export default Functionality;