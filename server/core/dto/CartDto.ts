import { CartItemDto } from "./CartItemDto";



export interface CartDto {
    amount: number;
    validated: boolean;
    id: number;
    items: CartItemDto[];
    customerId: number | null;
}

export interface ValidatedCartDto {
    amount: number;
    validated: boolean;
    id: number;
    items: CartItemDto[];
    customerId: number;
}