import { CartItemDto } from "../../dto/CartItemDto";
import { CartItem } from "../valueObjects/CartItem";

export class CartItemFactory {

    public static from(itemDto: CartItemDto): CartItem {
        return new CartItem(itemDto.product_id, itemDto.product_name, itemDto.product_price, itemDto.image_url, itemDto.quantity);
    }

    public static fromArray(itemsDto: CartItemDto[]): CartItem[] {
        return itemsDto.map((item)=> CartItemFactory.from(item));
    }

    public static toDtoArray(items: CartItem[]): CartItemDto[] {
        return items.map((item: CartItem) => item.asDto());
    }

    // public static of()
}