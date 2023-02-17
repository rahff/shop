
import { FindOneResponse, FindResponse } from "strapi-adapter";
import { IHttpService } from "../../shared/http/IHttpService";
import { IQueryProduct } from "../interfaces/IQueryProduct";
import { ProductCardDto } from "../interfaces/ProductCardDto";
import { ProductViewDto } from "../interfaces/ProductViewDto";



export class QueryProduct implements IQueryProduct {

    private baseProductUrl = "/api/products";

    constructor(private http: IHttpService){}
    
    async getProductPage(page: number): Promise<FindResponse<ProductCardDto>> {
        const query = `?populate[0]=images&pagination[page]=${page}&pagination[pageSize]=6`;
        const response = await this.http.find<ProductCardDto>(this.baseProductUrl + query);    
        if(response) return response;
        throw new Error("404 not found");
    }

    async getProductDetail(id: number): Promise<FindOneResponse<ProductViewDto>> {
        const query = `?populate[0]=images`;
        const response = await this.http.findOne<ProductViewDto>(this.baseProductUrl + `/${id}`+ query);
        if(response) return response;
        throw new Error("404 not found");
    }
}