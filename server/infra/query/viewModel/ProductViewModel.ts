import { Image } from "strapi-adapter";

export interface ProductCardViewModel {
    name: string;
    price: number;
    promotion: number;
    image: Image;
    brand: string;
    package: string;
    id: number;
}
