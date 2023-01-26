import { Product } from "../model/entities/Product";



export interface IProductService {
    getProductById(id: number): Promise<Product>
}