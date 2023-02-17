import { ProductPageModel } from "./ProductPageModel";
import { ProductDetailModel } from "./ProductDetailModel";
import { FindOneResponse, FindResponse } from "strapi-adapter";
import { ProductViewDto } from "../interfaces/ProductViewDto";
import { ProductCardDto } from "../interfaces/ProductCardDto";




export class ShopPageViewPresenter {

    public static productPageModel(input: FindResponse<ProductCardDto>): ProductPageModel {
        const entities = input.data;
        const listProduct = entities.map((entity: ProductCardDto)=> {
                return {
                    name: entity.name,
                    brand: entity.brand,
                    price: entity.price,
                    package: entity.package,
                    promotion: entity.promotion,
                    images: entity.images,
                    id: entity.id
                }
            });

            return { listProduct, pagination: input.pagination };
    }


    public static productDetailModel(product: FindOneResponse<ProductViewDto>): ProductDetailModel {
        const attributes = product.data;
        return {
            productName: attributes.name,
            brand: attributes.brand,
            images: attributes.images,
            longDescription: attributes.long_description,
            shortDescription: attributes.short_description,
            packaging: attributes.package,
            price: attributes.price,
            promotion: attributes.promotion,
            id: attributes.id
        }
    }
}