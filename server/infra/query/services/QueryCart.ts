import { IHttpService } from "../../shared/http/IHttpService";
import { CartQueryDto } from "../interfaces/CartQueryDto";
import { IQueryCart } from "../interfaces/IQueryCart";



export class QueryCart implements IQueryCart {

    private cartBaseUrl = "/api/carts";
    private queryParams = "?populate[0]=items&populate[1]=customer";

    constructor(private http: IHttpService){}
    
    async getCartById(cartId: number): Promise<CartQueryDto | null> {
        const foundedCart = await this.http.findOne<CartQueryDto>(`${this.cartBaseUrl}/${cartId}`+this.queryParams);
        if(foundedCart) return foundedCart.data;
        return null;
    }
}