import { Entity } from "../interfaces/Entity";
import { Image } from "../interfaces/Image";
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { ProductPageModel } from "../interfaces/ProductPageModel";
import { ImageViewModel } from "../interfaces/ProductViewModel";
import { JsonProduct } from "../interfaces/JsonProduct";



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
                small: entity.attributes.formats.small.url
            }
        })
        
    }
}