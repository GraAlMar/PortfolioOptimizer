import React from "react";
import AssetResultListItem from "./AssetResultListItem";
import { AssetResultListProps } from "../data/AssetResultListProps";
import { Asset } from "../data/AssetType";

const listRender = (list: Asset[] | Asset) => {
   
    const arrayList = Array.isArray(list) ? list : [list];
    
    return arrayList ? (arrayList.map((item: Asset, index: number) => {
        return <AssetResultListItem key={index} item={item}/>
    })) : (
		<p> loading... </p>
	)
}


const AssetResultList: React.FC<AssetResultListProps> = ({assets}) => {
    return <div>{listRender(assets)}</div>
}
export default AssetResultList