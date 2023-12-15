import React from 'react';
import Typography from "@mui/material/Typography";
import {MenuItem, Select} from "@mui/material";
import {Asset} from "../data/AssetType.tsx";

interface MatcherSelectionProps {
    matcher: Asset | null;
    matchers: Asset[];
    onSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const MatcherSelection: React.FC<MatcherSelectionProps> = ({ matcher, matchers, onSelectChange}) => {

    return (
        <div>
            {matcher ? (
                <div>
                    <Typography variant="body1">{matcher.name}</Typography>
                    <Typography variant="body2">{matcher.abbreviation}</Typography>
                    <Typography variant="body2">{matcher.price}</Typography>

                    {/* Number fields*/}
                </div>
            ) : (
                <Typography variant="body1">You haven't yet chosen a matcher</Typography>
            )}

            <Select value={matcher ? matcher.name : ''} onChange={onSelectChange} displayEmpty>
                {matcher ? null : <MenuItem value="" disabled>Choose Matcher</MenuItem>}
                {matchers.map((asset) => (
                    <MenuItem key={asset.id} value={asset.name}>
                        {asset.name}
                    </MenuItem>
                ))}
                {matcher ? <MenuItem value="" disabled></MenuItem> : null}
            </Select>
        </div>
    );
};

export default MatcherSelection;
