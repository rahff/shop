import { CartDto } from "../../dto/CartDto";
import { Cart, CustomerCart, ValidatedCart } from "../entities/Cart";
import { CartItemFactory } from "./CartItemFactory";



export class CartFactory {

    public static emptyDto(): Omit<CartDto, 'id'> {
      return {amount: 0, items: [], customerId: null, validated: false}
    }
    public static from(cartDto: CartDto): Cart {
        if(!cartDto.customerId) {
            return new Cart(cartDto.id, CartItemFactory.fromArray(cartDto.items));
        }else if(cartDto.customerId && !cartDto.validated){
            return CartFactory.customerCart(cartDto.customerId, cartDto);
        }else if (cartDto.validated) {
            return CartFactory.validatedCart(cartDto);
        }
        throw new Error("invalid state of cart");
    }

    public static customerCart(customerId: number, dto: CartDto): CustomerCart {
        return new CustomerCart(dto.id, customerId, CartItemFactory.fromArray(dto.items));
    }

    public static validatedCart(dto: CartDto): ValidatedCart {
        if(!dto.customerId) throw new Error("this cart is not attached to any customer");
        return new ValidatedCart(dto.id, dto.customerId, CartItemFactory.fromArray(dto.items));
    }
}