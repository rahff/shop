import { AddProductToCartCommand } from "../command/AddProductToCartCommand";
import { Cart } from "../model/entities/Cart";
import { ICartService } from "../model/interfaces/ICartService";
import { CartItem } from "../model/valueObjects/CartItem";
import { IProductService } from "../model/interfaces/IProductService";
import { ValidateCartCommand } from "../command/ValidateCartCommand";
import { IAccountService } from "../model/interfaces/IAccountService";
import { RemoveCartItemCommand } from "../command/RemoveCartItemCommand";
import { DecrementQuantityItemCommand } from "../command/DecrementQuantityItemCommand";



export class CartManager {

    constructor(private service: ICartService, 
                private getProduct: IProductService,
                private accountService: IAccountService){}

    async addCartItem(command: AddProductToCartCommand): Promise<Cart> {
        const cart = await this.service.getCartOrCreateNewOne(command.cartId);
        if(cart.isValidated()) return cart;
        const {id, attributes} = await this.getProduct.getProductById(command.productId);
        const imageCart = attributes.images.data[0].attributes.formats.thumbnail.url;
        const cartItem = new CartItem(id, attributes.name, attributes.price, imageCart);
        cart.addItem(cartItem);
        const customerId = await this.accountService.isCustomerAuthenticated(command.token);
        cart.toCustomer(customerId);
        return await this.service.saveCart(cart);
    }

    async validateCart(command: ValidateCartCommand): Promise<boolean> {
        const isCustomerAuthenticated = await this.accountService.isCustomerAuthenticated(command.token);
        if(isCustomerAuthenticated) {
            const foundedCart = await this.service.getCartOrNothing(command.cartId);
            if(!foundedCart) return false;
            foundedCart.validate();
            this.service.saveCart(foundedCart);
            return foundedCart.isValidated();
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