import {Asset} from "./AssetType"

export interface AssetResultListItemProps {
    item: Asset
    onSelect?: (item: Asset) => void
    onSave?: (item: Asset) => void
}