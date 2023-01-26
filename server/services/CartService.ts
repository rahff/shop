import { ICartService } from "../core/interfaces/ICartService";
import { Cart } from "../core/model/entities/Cart";
import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { Entity } from "../interfaces/Entity";
import { IEventBus } from "../interfaces/IEventBus";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { JsonCartOut, JsonCartIn } from "../interfaces/JsonCart";
import { EntityMapper } from "./EntityMapper";
import { HttpService }  from "./HttpService";



export class CartService implements ICartService {

    private cartBaseUrl = "/api/carts?populate[0]=items";
    private queryParams = "?populate[0]=items&populate[1]=customer";

    constructor(private http: HttpService, private eventBus: IEventBus){}

    async saveCart(cart: Cart): Promise<Cart> {
        try {
            const cartJson = EntityMapper.cartToJsonOut(cart)
            const responseApi = await this.http
            .put<IStrapiSingleResponse<JsonCartIn>, JsonCartOut>(
                `/api/carts/${cartJson.id}`+this.queryParams,
                 cartJson);         
            return EntityMapper.JsonInputToCart(responseApi.data);
        } catch (error) {
            throw error;
        }
    }

    async validateCart(cart: Cart): Promise<Cart> {
        const validatedCart = await this.saveCart(cart);
        this.eventBus.dispatch(new CartValidatedEvent(validatedCart));
        return validatedCart;
    }

    async getCartOrCreateNewOne(cartId: number): Promise<Cart> {
        try {
            const apiResponse = await this.http.get<IStrapiSingleResponse<JsonCartIn>>(`/api/carts/${cartId}`+this.queryParams);
            return EntityMapper.JsonInputToCart(apiResponse.data, );
        } catch (error) {
            const newCart = EntityMapper.cartToJsonWithoutId(new Cart(0, false, []))
            const apiResponse = await this.createNewCart(newCart);
            return EntityMapper.JsonInputToCart(apiResponse);
        }
    }

    private async createNewCart(cart: Omit<JsonCartOut, "id">): Promise<Entity<JsonCartIn>> {
        try {
            const response = await this.http.post<IStrapiSingleResponse<JsonCartIn>, Omit<JsonCartOut, "id">>(this.cartBaseUrl, cart);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCartOrNothing(cartId: number): Promise<Cart | null> {
        try {
            const foundedCart = await this.http.get<IStrapiSingleResponse<JsonCartIn>>(`/api/carts/${cartId}`+this.queryParams);
            return EntityMapper.JsonInputToCart(foundedCart.data);
        } catch (error: any) {
            return null;
        }
    }
}