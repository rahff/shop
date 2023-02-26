import { ICartService } from "../../../core/interfaces/ICartService";
import { IHttpService } from "../../shared/http/IHttpService";
import { CartDto } from "../../../core/dto/CartDto";
import { CartFactory } from "../../../core/model/factories/CartFactory";
import { Data } from "../interfaces/Data";



export class CartService implements ICartService {

    private cartBaseUrl = "/api/carts";
    private queryParams = "?populate[0]=items&populate[1]=customer";

    constructor(private http: IHttpService){}

    async saveCart(cart: CartDto): Promise<CartDto> {
        const cartData = {data: cart};
        const responseApi = await this.http
        .put<Data<CartDto>, CartDto>
            (`${this.cartBaseUrl}/${cart.id}`+this.queryParams, cartData); 
        
        return responseApi.data;
    }
        
    // async validateCart(cart: CartDto): Promise<CartDto> { 
    //     await this.saveCart(cart);               
    //     const eventData = {customerId: cart.customerId as number, cartId: cart.id};
    //     this.eventBus.dispatch(new CartValidatedEvent(eventData));
    //     return cart;
    // }

    async getCartOrCreateNewOne(cartId: number): Promise<CartDto> {
        const apiResponse = await this.http.findOne<CartDto>(`${this.cartBaseUrl}/${cartId}`+this.queryParams); 
        if(apiResponse) return apiResponse.data;
        else{
            const newCart = CartFactory.emptyDto();
            const apiResponse = await this.createNewCart(newCart);
            return apiResponse;
        }
    }
    
    private async createNewCart(cart: Omit<CartDto, "id">): Promise<CartDto> {
        const cartData = {data: cart}
        const response = await this.http.post<Data<Omit<CartDto, "id">>, CartDto>(this.cartBaseUrl+this.queryParams, cartData); 
        return response.data;
    }

    async getCartOrNothing(cartId: number): Promise<CartDto | null> {
        const foundedCart = await this.http.findOne<CartDto>(`${this.cartBaseUrl}/${cartId}`+this.queryParams);
        if(foundedCart) return foundedCart.data;
        return null;
    }
}