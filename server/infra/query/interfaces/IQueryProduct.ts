import { FindOneResponse, FindResponse } from "strapi-adapter";
import { ProductCardDto } from "./ProductCardDto";
import { ProductViewDto } from "./ProductViewDto";

export interface IQueryProduct {
    getProductPage(page: number): Promise<FindResponse<ProductCardDto>>
    getProductDetail(id: number): Promise<FindOneResponse<ProductViewDto>>
}