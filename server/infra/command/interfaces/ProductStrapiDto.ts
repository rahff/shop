import { ImageList } from "strapi-adapter";

export interface ProductStrapiDto {
    id: number,
    name: string,
    short_description: string,
    long_description: string,
    price: number,
    promotion: number,
    brand: string,
    package: string,
    images: ImageList
}