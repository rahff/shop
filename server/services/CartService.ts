import { ICartService } from "../core/interfaces/ICartService";
import { Cart } from "../core/model/entities/Cart";
import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { Entity } from "../interfaces/Entity";
import { IEventBus } from "../interfaces/IEventBus";
import { IHttpService } from "../interfaces/IHttpService";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { JsonCartOut, JsonCartIn, JsonNewCartOut } from "../interfaces/JsonCart";
import { EntityMapper } from "./EntityMapper";
import { HttpService }  from "./HttpService";



export class CartService implements ICartService {

    private cartBaseUrl = "/api/carts";
    private queryParams = "?populate[0]=items&populate[1]=customer";

    constructor(private http: IHttpService, private eventBus: IEventBus){}

    async saveCart(cart: Cart): Promise<Cart> {
        const cartJson = EntityMapper.cartToJsonOut(cart);
        const responseApi = await this.http
        .put<IStrapiSingleResponse<JsonCartIn>, JsonCartOut>
            (`${this.cartBaseUrl}/${cart.getId()}`+this.queryParams, cartJson);        
        return cart;
    }
        
    async validateCart(cart: Cart): Promise<Cart> { 
        await this.saveCart(cart);               
        const eventData = {customerId: cart.getCustomerId() as number, cartId: cart.getId()};
        this.eventBus.dispatch(new CartValidatedEvent(eventData));
        return cart;
    }

    async getCartOrCreateNewOne(cartId: number): Promise<Cart> {
        const apiResponse = await this.http.get<IStrapiSingleResponse<JsonCartIn>>(`${this.cartBaseUrl}/${cartId}`+this.queryParams);
        if(apiResponse) return EntityMapper.JsonInputToCart(apiResponse.data);
        else{
            const newCart = EntityMapper.cartToJsonWithoutId(new Cart(0, false, [], 0));
            const apiResponse = await this.createNewCart(newCart);
            return EntityMapper.JsonInputToCart(apiResponse);
        }
    }

    private async createNewCart(cart: JsonNewCartOut): Promise<Entity<JsonCartIn>> {
        const response = await this.http.post<IStrapiSingleResponse<JsonCartIn>, JsonNewCartOut>(this.cartBaseUrl+this.queryParams, cart); 
        return response.data;
    }

    async getCartOrNothing(cartId: number): Promise<Cart | null> {
        const foundedCart = await this.http.get<IStrapiSingleResponse<JsonCartIn>>(`${this.cartBaseUrl}/${cartId}`+this.queryParams);
        if(foundedCart) return EntityMapper.JsonInputToCart(foundedCart.data);
        return null;
    }
}