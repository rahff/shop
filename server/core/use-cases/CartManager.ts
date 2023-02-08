import { AddProductToCartCommand } from "../command/AddProductToCartCommand";
import { Cart } from "../model/entities/Cart";
import { CartItem } from "../model/valueObjects/CartItem";
import { ValidateCartCommand } from "../command/ValidateCartCommand";
import { RemoveCartItemCommand } from "../command/RemoveCartItemCommand";
import { DecrementQuantityItemCommand } from "../command/DecrementQuantityItemCommand";
import { ICartService } from "../interfaces/ICartService";
import { IProductService } from "../interfaces/IProductService";
import { IAccountService } from "../interfaces/IAccountService";



export class CartManager {

    constructor(private service: ICartService, 
                private getProduct: IProductService,
                private accountService: IAccountService){}

    async addCartItem(command: AddProductToCartCommand): Promise<Cart> {
        const cart = await this.service.getCartOrCreateNewOne(command.cartId);
        if(cart.isValidated()) return cart;
        const product = await this.getProduct.getProductById(command.productId);
        const cartItem = new CartItem(product.getId(),product.getName(), product.getPrice(), product.getImage());
        cart.addItem(cartItem);
        const customerId = await this.accountService.getUserIdIfAuthenticated(command.token);
        if(customerId) cart.toCustomer(customerId);       
        await this.service.saveCart(cart);     
        return cart;
    }

    async validateCart(command: ValidateCartCommand): Promise<boolean> {
        const isCustomerAuthenticated = await this.accountService.getUserIdIfAuthenticated(command.token);      
        if(isCustomerAuthenticated) {
            const foundedCart = await this.service.getCartOrNothing(command.cartId);
            if(!foundedCart || foundedCart.isValidated()) return false;
            foundedCart.toCustomer(isCustomerAuthenticated);
            foundedCart.validate();
            const validatedCart = await this.service.validateCart(foundedCart);
            return validatedCart.isValidated();
        }
        return false;
    }

    async removeCartItem(command: RemoveCartItemCommand): Promise<Cart> {
        const cart = await this.service.getCartOrNothing(command.cartId);
        if(!cart) throw new Error("404 not found");
        cart.removeItem(command.productId);
        return await this.service.saveCart(cart);
    }

    async decrementCartItem(command: DecrementQuantityItemCommand): Promise<Cart> {
       const cart = await this.service.getCartOrNothing(command.cartId);
       if(!cart) throw new Error("404 not found");
       cart.decrementItem(command.productId);
       return await this.service.saveCart(cart);
    }
}