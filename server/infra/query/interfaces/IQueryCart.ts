import { CartQueryDto } from "./CartQueryDto";

export interface IQueryCart {
    getCartById(cartId: number): Promise<CartQueryDto | null>
}