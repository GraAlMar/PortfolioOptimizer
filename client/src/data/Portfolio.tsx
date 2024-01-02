import {Asset} from "./AssetType.tsx";

export interface Portfolio {
    id?: number;
    userId?: number;
    investments?: Investment[];
    portfolioBeta: number;
    portfolioSharpeRatio: number;
}
export interface Investment  {
    id?: number;
    asset: Asset;
    amount: number;
}