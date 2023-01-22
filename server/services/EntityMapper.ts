import { Cart } from "../core/model/entities/Cart";
import { Entity } from "../core/model/interfaces/Entity";
import { CartItem } from "../core/model/valueObjects/CartItem";
import { JsonCart, JsonCartItem } from "../interfaces/JsonCart";

export class EntityMapper {
    public static cartToJson(cart: Cart): JsonCart {
        return {
            amount: cart.getAmount(),
            customer: cart.getCustomerId() || 0,
            validated: cart.isValidated(),
            items: EntityMapper.cartItemToJson(cart.getItems())
        }
    }

    private static cartItemToJson(items: CartItem[]): JsonCartItem[] {
        return items.map((item: CartItem) => {
            return {
                amount: item.getAmount(),
                image_url: item.getImageUrl(),
                product_id: item.getProductId(),
                product_name: item.getProductName(),
                product_price: item.getProductPrice(),
                quantity: item.getQuantity()
            }
        })
    }

    private static jsonToCartItem(items: JsonCartItem[]): CartItem[] {
        return items.map((item: JsonCartItem) => {
            return new CartItem(item.product_id, item.product_name, item.product_price, item.image_url, item.quantity);
        })
    }

    public static JsonToCart(json: Entity<JsonCart>): Cart {
        return new Cart(json.id, json.attributes.validated, EntityMapper.jsonToCartItem(json.attributes.items));
    }
}