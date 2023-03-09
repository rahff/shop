import { ImageList } from "strapi-adapter";


export interface ProductCardDto {
    name: string,
    brand: string,
    price: number,
    package: string,
    promotion: number,
    images: ImageList,
    id: number
}