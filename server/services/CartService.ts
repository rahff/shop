import { Cart } from "../core/model/entities/Cart";
import { ICartService } from "../core/model/interfaces/ICartService";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { JsonCart } from "../interfaces/JsonCart";
import { EntityMapper } from "./EntityMapper";
import { HttpService }  from "./HttpService";



export class CartService implements ICartService {

    private cartBaseUrl = "/cart?populate[0]=items"
    constructor(private http: HttpService){}

    async saveCart(cart: Cart): Promise<Cart> {
        const cartJson = EntityMapper.cartToJson(cart)
        const responseApi = await this.http.put<IStrapiSingleResponse<JsonCart>, JsonCart>(this.cartBaseUrl, cartJson);
        const _cart: Cart = EntityMapper.JsonToCart(responseApi.data)
        return _cart;
    }
    async getCartOrCreateNewOne(cartId: number): Promise<Cart> {
        throw new Error("Method not implemented.");
    }
    async getCartOrNothing(cartId: number): Promise<Cart | null> {
        throw new Error("Method not implemented.");
    }

}