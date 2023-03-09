export interface ProductPageModel {
    listProduct: ProductCardDto[];
    pagination: { page: number, pageSize: number, pageCount?: number, total: number } | {}
}

export interface ProductCardDto {
    name: string;
    price: number;
    promotion: number;
    image: Image;
    brand: string;
    package: string;
    id: number;
}

export interface Image {
    alt: string | null;
    small: string;
    thumbnail: string;
    url: string;
}