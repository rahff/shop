import { IHttpService } from "./interfaces/IHttpService";
import { Product } from "./interfaces/Product";




export class GetProduct {

    private baseProductUrl = "/api/products"
    constructor(private http: IHttpService){}

    async getPage(): Promise<Product[]> {
        const response: any = await this.http.get<Product[]>(this.baseProductUrl);
        return response;
    }
}