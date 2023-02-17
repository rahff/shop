import { ImageList } from "strapi-adapter"


export interface ProductViewDto {
    name: string,
    brand: string,
    price: string,
    package: string,
    promotion: number,
    images: ImageList,
    id: number,
    long_description: string
    short_description: string
}