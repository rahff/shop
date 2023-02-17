import { AddProductToCartCommand } from "../command/AddProductToCartCommand";
import { Cart } from "../model/entities/Cart";
import { CartItem } from "../model/valueObjects/CartItem";
import { ValidateCartCommand } from "../command/ValidateCartCommand";
import { RemoveCartItemCommand } from "../command/RemoveCartItemCommand";
import { DecrementQuantityItemCommand } from "../command/DecrementQuantityItemCommand";
import { ICartService } from "../interfaces/ICartService";
import { IProductService } from "../interfaces/IProductService";
import { IAccountService } from "../interfaces/IAccountService";
import { CartFactory } from "../model/factories/CartFactory";
import { CartDto } from "../dto/CartDto";
import { ICartManager } from "../../shared/ICartManger";
import { CartValidatedEvent } from "../events/CartValidatedEvent";




export class CartManager implements ICartManager {

    constructor(private service: ICartService, 
                private getProduct: IProductService,
                private accountService: IAccountService){}

    async addCartItem(command: AddProductToCartCommand): Promise<CartDto> {
        const customerId = await this.accountService.getUserIdIfAuthenticated(command.token);
        const cartDto = await this.service.getCartOrCreateNewOne(command.cartId);
        if(cartDto.validated) return cartDto;
        const product = await this.getProduct.getProductById(command.productId);
        const cartItem = new CartItem(product.id, product.name, product.price, product.images);
        if(customerId){ 
            const cart = CartFactory.customerCart(customerId, cartDto);
            cart.addItem(cartItem);
            const savedCart = await this.service.saveCart(cart.asDto());     
            return savedCart;
        }
        let cart = CartFactory.from(cartDto);
        cart.addItem(cartItem);
        const savedCart = await this.service.saveCart(cart.asDto());     
        return savedCart;
    }

    async validateCart(command: ValidateCartCommand): Promise<CartValidatedEvent> {
        const isCustomerAuthenticated = await this.accountService.getUserIdIfAuthenticated(command.token);      
        if(!isCustomerAuthenticated) throw new Error("unauthenticated customer");
        const foundedCartDto = await this.service.getCartOrNothing(command.cartId);
        if(!foundedCartDto || foundedCartDto.validated) throw new Error("404 not found");
        let foundedCart = CartFactory.from(foundedCartDto);
        if(foundedCart instanceof Cart){
            foundedCart = CartFactory.customerCart(isCustomerAuthenticated, foundedCart.asDto())
        }
        foundedCart = CartFactory.validatedCart(foundedCart.asDto());
        const validatedCartDto = await this.service.saveCart(foundedCart.asDto());
        const validatedCart = CartFactory.validatedCart(validatedCartDto);
        return new CartValidatedEvent(validatedCart.asDto());
    }

    async removeCartItem(command: RemoveCartItemCommand): Promise<CartDto> {
        const cartDto = await this.service.getCartOrNothing(command.cartId);
        if(!cartDto) throw new Error("404 not found");
        const cart = CartFactory.from(cartDto);
        cart.removeItem(command.productId);
        const savedCartDto =  await this.service.saveCart(cart.asDto());
        return CartFactory.from(savedCartDto).asDto();
    }

    async decrementCartItem(command: DecrementQuantityItemCommand): Promise<CartDto> {
       const cartDto = await this.service.getCartOrNothing(command.cartId);
       if(!cartDto) throw new Error("404 not found");
       const cart = CartFactory.from(cartDto);
       cart.decrementItem(command.productId);
       return await this.service.saveCart(cart.asDto());
    }
}