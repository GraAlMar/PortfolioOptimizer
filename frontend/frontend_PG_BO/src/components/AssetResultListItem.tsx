import React from "react";
import { Link } from "react-router-dom";

import { AssetResultListItemProps } from "../data/AssetResultListItemProps";

const AssetResultListItem: React.FC<AssetResultListItemProps> = ({item, /*onSelect, onSave*/}) => {

    return (item ?
        <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.assetSymbol}</td>
            <td>{item.assetBeta}</td>
                

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
        
        : <ul></ul>
    )
}
export default AssetResultListItem