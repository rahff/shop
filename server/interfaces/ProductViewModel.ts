export interface ProductCardViewModel {
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    promotion: number;
    images: ImageViewModel[];
    brand: string;
    package: string;
    id: number;
}

export interface ImageViewModel {
    small: string, thumbnail: string, medium: string
};