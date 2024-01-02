import React from "react";
//import { Link } from "react-router-dom";


//import { AssetResultListItemProps } from "../data/AssetResultListItemProps";
import {Asset} from "../data/AssetType.tsx";
interface AssetResultListItemProps {
    item: Asset
    onSelectBC?: (item: Asset) => void
    onSaveBC?: (item: Asset) => void
}
const AssetResultListItem: React.FC<AssetResultListItemProps> = ({item, onSelectBC, onSaveBC}) => {

    function onSaveAsMain() {
        return onSelectBC(item);
    }

    function onSaveAsMatcher() {
        return onSaveBC(item);
    }

    return (item ?
        <tr key={item.name}>
            <td>{item.name}</td>

            <td><button type="button" onClick={onSaveAsMain}></button></td>
            <td><button type="button" onClick={onSaveAsMatcher}></button></td>


            <td>
                {/* <Link to={`/portfoliospace/`}>
                    <button type="button" onClick={() => onSelect(item.name)}>Select</button>
                </Link>
                <button type="button" onClick={() => onSave(item.name)}>
                    Delete
                </button> */}
            </td>
        </tr>
        // <li>{ item.name + " " + item.assetSymbol}
        // </li>
        
        : <tr><td>No results found</td></tr>
    )
}
export default AssetResultListItem