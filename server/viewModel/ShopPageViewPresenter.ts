import { Entity } from "../interfaces/Entity";
import { Image } from "../interfaces/Image";
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { ProductPageModel } from "./ProductPageModel";
import { ImageViewModel } from "./ProductViewModel";
import { JsonProduct } from "../interfaces/JsonProduct";
import { ProductDetailModel } from "./ProductDetailModel";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";



export class ShopPageViewPresenter {

    public static productPageModel(input: IPluralResponse<JsonProduct>): ProductPageModel {
        const entities = input.data;
        const listProduct = entities.map((entity: Entity<JsonProduct>)=> {
                return {
                    name: entity.attributes.name,
                    brand: entity.attributes.brand,
                    price: entity.attributes.price,
                    package: entity.attributes.package,
                    promotion: entity.attributes.promotion,
                    images: ShopPageViewPresenter.mapImages(entity.attributes.images.data),
                    id: entity.id
                }
            });

            return { listProduct, pagination: input.meta.pagination };
    }

    private static mapImages(input: Entity<Image>[]): ImageViewModel[] {
        return input.map((entity: Entity<Image>) => {
            return {
                small: entity.attributes.formats.small.url,
                thumbnail: entity.attributes.formats.thumbnail.url,
                medium: entity.attributes.formats.medium.url,
            }
        })
        
    }

    public static productDetailModel(product: IStrapiSingleResponse<JsonProduct>): ProductDetailModel {
        const {id, attributes} = product.data;
        return {
            productName: attributes.name,
            brand: attributes.brand,
            images: ShopPageViewPresenter.mapImages(attributes.images.data),
            longDescription: attributes.long_description,
            shortDescription: attributes.short_description,
            packaging: attributes.package,
            price: attributes.price.toFixed(2),
            promotion: attributes.promotion,
            id: id
        }
    }
}