import { CartDto } from "../dto/CartDto";



export interface ICartService {
    saveCart(cart: CartDto): Promise<CartDto>;
    // validateCart(cart: CartDto): Promise<CartDto>;
    getCartOrCreateNewOne(cartId: number): Promise<CartDto>;
    getCartOrNothing(cartId: number): Promise<CartDto | null>;
}