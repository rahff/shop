
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { HttpService } from "./HttpService";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { EntityMapper } from "./EntityMapper";
import { JsonProduct } from "../interfaces/JsonProduct";
import { Product } from "../core/model/entities/Product";
import { IProductService } from "../core/interfaces/IProductService";



export class ProductService implements IProductService {

    private baseProductUrl = "/api/products";

    constructor(private http: HttpService){}
    
    async getProductPage(page: number): Promise<IPluralResponse<JsonProduct>> {
        const query = `?populate[0]=images&pagination[page]=${page}&pagination[pageSize]=6`;
        return await this.http.get(this.baseProductUrl + query);
    }

    async getProductById(id: number): Promise<Product> {
        const query = `?populate[0]=images`;
        const response = await this.http.get<IStrapiSingleResponse<JsonProduct>>(this.baseProductUrl + `/${id}`+ query);
        return EntityMapper.JsonToProduct(response.data);
    }
}