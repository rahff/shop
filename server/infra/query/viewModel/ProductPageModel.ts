
import { ProductCardViewModel } from "./ProductViewModel";


export interface ProductPageModel {
    listProduct: ProductCardViewModel[];
    pagination: { page: number, pageSize: number, pageCount?: number, total: number } | {}
}