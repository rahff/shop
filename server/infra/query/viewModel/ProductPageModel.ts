import { ProductCardDto } from "../interfaces/ProductCardDto";


export interface ProductPageModel {
    listProduct: ProductCardDto[];
    pagination: { page: number, pageSize: number, pageCount?: number, total: number } | {}
}