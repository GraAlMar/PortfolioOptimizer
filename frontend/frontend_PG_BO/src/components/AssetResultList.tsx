import React from "react";
import AssetResultListItem from "./AssetResultListItem";
import { AssetResultListProps } from "../data/AssetResultListProps";
import { Asset } from "../data/AssetType";

const renderList = (list: Asset[] | Asset) => {
   
    const arrayList = Array.isArray(list) ? list : [list];
    
    return arrayList ? (
        <div className="AssetTable">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Beta</th>

                    </tr>
                </thead>
                <tbody>{
                    arrayList.map((item: Asset, index: number) => {
                        return <AssetResultListItem key={index} item={item} /*onSelect={} onSave={}*//> })} 
                </tbody>
            </table>
        </div>
        
        
        
    
    
    ) : (
		<p> loading... </p>
	)
}


const AssetResultList: React.FC<AssetResultListProps> = ({assets}) => {
    return <div>{renderList(assets)}</div>
}

export default AssetResultList