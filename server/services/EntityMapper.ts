import { Cart } from "../core/model/entities/Cart";
import { Entity } from "../interfaces/Entity";
import { CartItem } from "../core/model/valueObjects/CartItem";
import { JsonCartOut, JsonCartIn, JsonCartItem } from "../interfaces/JsonCart";
import { JsonProduct } from "../interfaces/JsonProduct";
import { Product } from "../core/model/entities/Product";

export class EntityMapper {

    public static cartToJsonOut(cart: Cart): JsonCartOut {
        return {
            amount: cart.getAmount(),
            customer: cart.getCustomerId(),
            validated: cart.isValidated(),
            items: EntityMapper.cartItemToJson(cart.getItems()),
            id: cart.getId()
        }
    }

    public static cartToJsonWithoutId(cart: Cart): Omit<JsonCartOut, "id"> {
        return {
            amount: cart.getAmount(),
            customer: cart.getCustomerId(),
            validated: cart.isValidated(),
            items: EntityMapper.cartItemToJson(cart.getItems()),
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

    public static JsonInputToCart(json: Entity<JsonCartIn>): Cart {
        const customerId = json.attributes.customer.data.id
       return new Cart(json.id, json.attributes.validated, EntityMapper.jsonToCartItem(json.attributes.items), customerId);
    }

    public static JsonToProduct(json: Entity<JsonProduct>): Product {
        const attributes = json.attributes
        const image = attributes.images.data[0].attributes.formats.thumbnail.url;
        return new Product(json.id, attributes.name, attributes.price, image, attributes.package);
    }
}