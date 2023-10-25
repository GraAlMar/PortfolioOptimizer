import React from "react";

const UserListItem: React.FC = (item) => {
    return (item ?
        <tr key={item.name}>
            <td>{item.name}</td>
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