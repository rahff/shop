
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { EntityMapper } from "./EntityMapper";
import { JsonProduct } from "../interfaces/JsonProduct";
import { Product } from "../core/model/entities/Product";
import { IProductService } from "../core/interfaces/IProductService";
import { IHttpService } from "../interfaces/IHttpService";



export class ProductService implements IProductService {

    private baseProductUrl = "/api/products";

    constructor(private http: IHttpService){}
    
    async getProductPage(page: number): Promise<IPluralResponse<JsonProduct>> {
        const query = `?populate[0]=images&pagination[page]=${page}&pagination[pageSize]=6`;
        const response = await this.http.get<IPluralResponse<JsonProduct>>(this.baseProductUrl + query);
        if(response) return response;
        throw new Error("404 not found");
    }

    async getProductById(id: number): Promise<Product> {
        const query = `?populate[0]=images`;
        const response = await this.http.get<IStrapiSingleResponse<JsonProduct>>(this.baseProductUrl + `/${id}`+ query);
        if(response) return EntityMapper.JsonToProduct(response.data);
        throw new Error("404 not found");
        
    }

    async getProductDetail(id: number): Promise<IStrapiSingleResponse<JsonProduct>> {
        const query = `?populate[0]=images`;
        const response = await this.http.get<IStrapiSingleResponse<JsonProduct>>(this.baseProductUrl + `/${id}`+ query);
        if(response) return response;
        throw new Error("404 not found");
        
    }
}