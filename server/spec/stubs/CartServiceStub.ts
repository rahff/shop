import { Cart } from "../../core/model/entities/Cart";
import { ICartService } from "../../core/model/interfaces/ICartService";



export class CartServiceStub implements ICartService {
    

    private data: Cart[] = [new Cart(7, false, [])];

    async saveCart(cart: Cart): Promise<Cart> {
        this.data.push(cart);
        return cart;
    }

    async getCartOrCreateNewOne(cartId: number): Promise<Cart> {
        const foundedCart = this.data.find((cart: Cart)=> cart.getId() === cartId );
        if(!foundedCart) return new Cart(147, false, []);
        return foundedCart;
        
    }

    async getCartOrNothing(cartId: number): Promise<Cart | null> {
        const foundedCart = this.data.find((cart: Cart)=> cart.getId() === cartId );
        if(!foundedCart) return null;
        return foundedCart;
    }
}