import { ImageList } from "strapi-adapter";

export interface ProductCardViewModel {
    name: string;
    price: number;
    promotion: number;
    images: ImageList;
    brand: string;
    package: string;
    id: number;
}
