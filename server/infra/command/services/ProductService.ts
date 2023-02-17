import { IProductService } from "../../../core/interfaces/IProductService";
import { IHttpService } from "../../shared/http/IHttpService";
import { ProductDto } from "../../../core/dto/ProductDto";
import { ProductStrapiDto } from "../interfaces/ProductStrapiDto";
import { DtoMapper } from "../utils/DtoMapper";



export class ProductService implements IProductService {

    private baseProductUrl = "/api/products";

    constructor(private http: IHttpService){}

    async getProductById(id: number): Promise<ProductDto> {
        const query = `?populate[0]=images`;
        const response = await this.http.findOne<ProductStrapiDto>(this.baseProductUrl + `/${id}`+ query);
        if(response) return DtoMapper.toProductDto(response.data);
        throw new Error("404 not found");
    }
}