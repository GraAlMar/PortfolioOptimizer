import React, { useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import AssetResultList from "../components/AssetResultList";
import { Asset } from "../data/AssetType";

const fetchAssets = (stateSetter: React.Dispatch<React.SetStateAction<Asset[]>>, queryParams: string): Promise<void> => {
    let urlPart;
    if (queryParams !== "") {
        urlPart = "?searchString=" + queryParams;
    }
    return fetch("http://localhost:8080/api/explore" + urlPart, {}).then(res => res.json().then(data => stateSetter(data)));
}

const Functionality: React.FC = () => {
    const [assets, setAssets] = useState<Asset[] | Asset>();
	const [userInput, setUserInput] = useState<string>("");

	useEffect(() => {
		fetchAssets(setAssets, userInput);
	}, []);

	const handleSearch = (searchTerm: string) => {
		setUserInput(searchTerm);
	};

    return (
        <div>
            {/*
            // input of user's existing asset(s)
            */}
            <SearchBar onSaveSearchTerm={handleSearch} />
			<AssetResultList assets={assets} />
            {/*
            // form for search given certain beta and/or sharperatio and specification of how many assets to combine with what ratios
            // list of search-results with add to portfolio-functionality 
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