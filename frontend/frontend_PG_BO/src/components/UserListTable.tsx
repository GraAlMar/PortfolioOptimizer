import React from "react";
//import {ThemeProvider} from "@mui/material/styles";
//import Button from "@mui/material/Button";
import {DataGrid, GridCellParams} from "@mui/x-data-grid";
import {User} from "../data/UserType.tsx";
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


function fetchDeleteUser(userid: number) {
    console.log(userid)
    fetch(`http://localhost:8080/api/users/${userid}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }

    })
}
interface UserListTableProps {
    users: User[];
    onDelete: (userid: number) => void;
    /*onShowProfile: (row: User) => void;
    */
}
const UserListTable: React.FC<UserListTableProps> = ({users,onDelete/*, onShowProfile*/}) => {




    const columns = [
        {field: "id", headerName: "Id", width: 200},
        {field: "username", headerName: "Username", width: 200},
        {field: "email", headerName: "Email", width: 200},
        {field: "roles", headerName: "Roles", width: 150},

        {field: "delete",
            headerName: "",
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>  (
                <IconButton aria-label="delete" size="small" onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.username}?`)) {
                        onDelete(params.row.id);
                    }
                }}>
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>

)
        }
        /*{field: "id2",
            headerName: "",
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: row => <ThemeProvider theme={greenTheme}><Button
                onClick={() => {console.log(row); return onAddToShortList(row.row)}}>Add to Shortlist</Button></ThemeProvider> }*/
    ]
    console.log(users)
    console.log("roles: " + columns[3]["field"])

    type Role = {
        id: number;
        name: string;
    };

    const createRolesString = (rolesArray: Role[]): string => {
        const roleNames = rolesArray.map(role => role.name.split("_")[1]);
        return roleNames.join(", ");
    };

    const userRows = users.map(user => ({id: user.id, username: user.username, email: user.email, roles: createRolesString(user.roles)}))
    console.log("userRows: " , userRows)
    return (<div style={{height: 500, width: '100%'}}>
        <DataGrid columns={columns} rows={userRows} getRowId={row => row.id}></DataGrid>

    </div>);
}
export default UserListTable;