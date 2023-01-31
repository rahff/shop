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
                const cartJson = EntityMapper.cartToJsonOut(cart);
                const responseApi = await this.http
                .put<IStrapiSingleResponse<JsonCartIn>, JsonCartOut>
                 (`/api/carts/${cartJson.id}`+this.queryParams, cartJson);        
                return cart;
            } catch (error: any) {
                throw error;
            }
        }
        
        async validateCart(cart: Cart): Promise<Cart> {
            try { 
                await this.saveCart(cart);       
                const eventData = {customerId: cart.getCustomerId() as number, cartId: cart.getId()};
                this.eventBus.dispatch(new CartValidatedEvent(eventData));
                return cart;
            } catch (error: any) {
                throw error
            }
    }

    async getCartOrCreateNewOne(cartId: number): Promise<Cart> {
        try {
            const apiResponse = await this.http.get<IStrapiSingleResponse<JsonCartIn>>(`/api/carts/${cartId}`+this.queryParams);
            return EntityMapper.JsonInputToCart(apiResponse.data);
        } catch (error) {
            const newCart = EntityMapper.cartToJsonWithoutId(new Cart(0, false, [], 0))
            try {
                const apiResponse = await this.createNewCart(newCart);
                return EntityMapper.JsonInputToCart(apiResponse);
            } catch (error: any) {
                console.log("create new level", error.message);
                throw error;
            }
        }
    }

    private async createNewCart(cart: Omit<JsonCartOut, "id">): Promise<Entity<JsonCartIn>> {
        try {
            const response = await this.http.post<IStrapiSingleResponse<JsonCartIn>, Omit<JsonCartOut, "id">>(this.cartBaseUrl+this.queryParams, cart); 
            return response.data;
        } catch (error: any) {
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