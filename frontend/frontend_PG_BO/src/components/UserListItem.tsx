import React from "react";
import {User} from "../data/UserType.tsx";
import IconButton from "@mui/material/IconButton";

const UserListItem: React.FC = (item: User) => {
    return (item ?
        <tr key={item.id}>
            <td>{item.username}</td>
            <td>{}</td>
            <td>{}</td>
                

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

export default UserListItem;