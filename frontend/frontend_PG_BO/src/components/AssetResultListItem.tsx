import React from "react";
import { AssetResultListItemProps } from "../data/AssetResultListItemProps";

const AssetResultListItem: React.FC<AssetResultListItemProps> = ({item}) => {

    return (item ?
        <li>{ item.name + " " + item.assetSymbol}
        </li> : <ul></ul>
    )
}
export default AssetResultListItem