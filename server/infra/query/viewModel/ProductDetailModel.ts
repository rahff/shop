import { ImageList } from "strapi-adapter"


export interface ProductDetailModel {
    productName: string
    price: string,
    images: ImageList,
    shortDescription: string,
    longDescription: string,
    packaging: string,
    promotion: number,
    brand: string,
    id: number
}