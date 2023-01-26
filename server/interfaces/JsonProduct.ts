import { Entity } from "./Entity";
import { Image } from "./Image";

export interface JsonProduct {
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    promotion: number;
    images:{ data: Entity<Image>[]};
    brand: string;
    package: string;
    variation: string;
    id: number
}