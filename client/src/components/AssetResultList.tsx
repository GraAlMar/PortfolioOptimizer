import React from "react";
import AssetResultListItem from "./AssetResultListItem";
import { Asset } from "../data/AssetType";

interface AssetResultListProps {
    assets: Asset[]
    onSelect?: (item: Asset) => void
    onSave?: (item: Asset) => void
}

const renderList = (list: Asset[] , onSave, onSelect ) => {
   
    const arrayList = list
    const onSaveBC = onSave;
    const onSelectBC = onSelect;
    console.log(arrayList)
    return arrayList?.length > 0 ? (
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
                        return <AssetResultListItem key={index} item={item} onSelectBC={onSelectBC} onSaveBC={onSaveBC}/> })}
                </tbody>
            </table>
        </div>
    ) : (
		<p> No results found </p>
	)
}


const AssetResultList: React.FC<AssetResultListProps> = ({assets, onSelect, onSave}) => {
    return <div>{renderList(assets, onSelect, onSave)}</div>

}

export default AssetResultList