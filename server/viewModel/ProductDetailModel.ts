import { ImageViewModel } from "./ProductViewModel"

export interface ProductDetailModel {
    productName: string
    price: string,
    images: ImageViewModel[],
    shortDescription: string,
    longDescription: string,
    packaging: string,
    promotion: number,
    brand: string,
    id: number
}