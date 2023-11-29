import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Asset} from "../data/AssetType.tsx";
import {ThemeProvider, createTheme} from '@mui/material/styles'
//import Button from 'material-ui/Button'
import {green, blue} from '@mui/material/colors'
import Button from "@mui/material/Button";


const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
interface AssetSearchTableProps {
    assets: Asset[]
    onSetAsMain: (row: Asset) => void;
    onAddToShortList: (row: Asset) => void;
}
const AssetSearchTable: React.FC<AssetSearchTableProps> = ({assets, onSetAsMain, onAddToShortList}) => {
    const columns = [
        {field: "id", headerName: "Id", width: 200},
        {field: "name", headerName: "Name", width: 200},
        {field: "abbreviation", headerName: "Symbol", width: 200},
        {field: "beta", headerName: "Beta", width: 150},
        {field: "price", headerName: "Price", width: 150},
        {field: "id1",
        headerName: "",
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: row => <ThemeProvider theme={blueTheme}><Button
            onClick={() => {console.log(row); return onSetAsMain(row.row)}}>Set as Main</Button></ThemeProvider> },
        {field: "id2",
            headerName: "",
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: row => <ThemeProvider theme={greenTheme}><Button
                onClick={() => {console.log(row); return onAddToShortList(row.row)}}>Add to Shortlist</Button></ThemeProvider> }
    ]
    return (<div style={{height: 500, width: '100%'}}>
        <DataGrid columns={columns} rows={assets} getRowId={row => row.abbreviation}></DataGrid>

    </div>);
}
export default AssetSearchTable;