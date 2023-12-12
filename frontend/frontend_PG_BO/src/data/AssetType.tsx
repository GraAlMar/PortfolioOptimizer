export interface Asset {
    id?: number;
    name: string;
    abbreviation: string;
    beta: number;
    sharperatio: number | null;
    price: number;
}