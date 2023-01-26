import { Cart } from "../model/entities/Cart";


export interface ICartService {
    saveCart(cart: Cart): Promise<Cart>;
    validateCart(cart: Cart): Promise<Cart>;
    getCartOrCreateNewOne(cartId: number): Promise<Cart>;
    getCartOrNothing(cartId: number): Promise<Cart | null>;
}