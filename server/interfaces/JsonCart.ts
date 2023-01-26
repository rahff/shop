
import { IStrapiSingleResponse } from "./IStrapiSingleResponse";

export type JsonCartOut = {
    customer: number | null;
    items: JsonCartItem[];
    amount: number;
    validated: boolean;
    id: number;
}

export type JsonCartIn = {
    customer: IStrapiSingleResponse<any>;
    items: JsonCartItem[];
    amount: number;
    validated: boolean;
    id: number;
}

export type JsonCartItem = {
    product_name: string;
    product_price: number;
    quantity: number;
    image_url: string;
    amount: number;
    product_id: number;
}