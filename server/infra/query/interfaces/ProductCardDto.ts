import { Image } from "strapi-adapter";


export interface ProductCardDto {
    name: string,
    brand: string,
    price: string,
    package: string,
    promotion: number,
    images: Image,
    id: number
}