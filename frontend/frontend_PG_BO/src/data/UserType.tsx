import {Asset} from "./AssetType.tsx";

export interface User {
    id?: number;
    username?: string;
    email?: string;
    userpassword?: string;
    roles?: Role[];
    mainAsset?: Asset;
    shortList?: ShortList;
}
type Role = {
    id: number;
    name: string;
};
type ShortList = {
    shortList: Asset[]
}