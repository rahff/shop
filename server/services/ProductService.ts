import { Entity } from "../core/model/interfaces/Entity";
import { IProductService } from "../core/model/interfaces/IProductService";
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { Product } from "../core/model/interfaces/Product";
import { HttpService } from "./HttpService";

export class ProductService implements IProductService {

    private baseProductUrl = "/api/products";

    constructor(private http: HttpService){}
    
    async getProductPage(page: number): Promise<IPluralResponse<Product>> {
        const query = `?populate[0]=images&pagination[page]=${page}&pagination[pageSize]=6`;
        return await this.http.get(this.baseProductUrl + query);
    }

    async getProductById(id: number): Promise<Entity<Product>> {
        throw new Error("Method not implemented.");
    }
}