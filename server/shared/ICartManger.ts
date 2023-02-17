import { AddProductToCartCommand } from "../core/command/AddProductToCartCommand";
import { DecrementQuantityItemCommand } from "../core/command/DecrementQuantityItemCommand";
import { RemoveCartItemCommand } from "../core/command/RemoveCartItemCommand";
import { ValidateCartCommand } from "../core/command/ValidateCartCommand";
import { CartDto } from "../core/dto/CartDto";
import { CartValidatedEvent } from "../core/events/CartValidatedEvent";



export interface ICartManager {
    addCartItem(command: AddProductToCartCommand): Promise<CartDto>
    validateCart(command: ValidateCartCommand): Promise<CartValidatedEvent>
    removeCartItem(command: RemoveCartItemCommand): Promise<CartDto>
    decrementCartItem(command: DecrementQuantityItemCommand): Promise<CartDto>
}