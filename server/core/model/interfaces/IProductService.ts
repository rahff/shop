import { Entity } from "./Entity";
import { Product } from "./Product";

export interface IProductService {
    getProductById(id: number): Promise<Entity<Product>>
}