import { ProductDto } from "../dto/ProductDto";



export interface IProductService {
    getProductById(id: number): Promise<ProductDto>
}