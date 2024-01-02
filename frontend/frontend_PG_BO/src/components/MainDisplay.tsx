import React from 'react';

import {Asset} from "../data/AssetType.tsx";
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help"
import styles from "./Style.module.css"

interface MainDisplayProps {
    asset: Asset;
}

const MainDisplay: React.FC<MainDisplayProps> = ({ asset }) => {
    return (
        <div>
            {asset ? (
                /*<div className={styles.divContainer}>
                    <div className={styles.divContainer}><Typography variant="body1">{asset.name}</Typography></div>
                    <div className={styles.divContainer}><Typography variant="body1">{asset.abbreviation}</Typography></div>
                    <div className={styles.divContainer}><Typography variant="body1">{asset.price}</Typography></div>

                </div>*/
                <>
                    <div style={{display: "inline-flex", justifyItems: "center", flexDirection: "row"}}>
                        <div style={{marginRight: "50px"}}><Typography variant="body1">{asset.name}</Typography></div>
                        <div><p></p></div>
                        <div style={{marginRight: "50px"}}><Typography variant="body1">{asset.abbreviation}</Typography>
                        </div>
                        <div><p></p></div>
                        <div style={{marginRight: "50px"}}><Typography variant="body1">{asset.price}</Typography></div>
                        <div><p></p></div>


                    </div>

                </>

            ) : (
                <Typography variant="body1">You have not yet chosen a main asset</Typography>
            )}

            <Tooltip title="To change your main asset please go to 'My assets' page" placement="right">
                <IconButton aria-label="info" color="info">
                    <HelpIcon />
                </IconButton>
            </Tooltip>

            {asset && (<div>
                <p>Please choose amount:</p>
            </div>)}

        </div>
    );
};

export default MainDisplay;
