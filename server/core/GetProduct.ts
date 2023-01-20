import { Entity } from "./interfaces/Entity";
import { IHttpService } from "./interfaces/IHttpService";
import { IStrapiResponse } from "./interfaces/IStrapiResponse";
import { Product } from "./interfaces/Product";




export class GetProduct {

    private baseProductUrl = "/api/products";
    
    constructor(private http: IHttpService){}

    async getPage(page: number=1): Promise<IStrapiResponse<Product>> {
        const query = `?populate[0]=images&pagination[page]=${page}&pagination[pageSize]=6`;
        return await this.http.getMany<Product>(this.baseProductUrl + query);
    }
}