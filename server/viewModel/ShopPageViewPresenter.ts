import { Entity } from "../core/model/interfaces/Entity";
import { Image } from "../core/model/interfaces/Image";
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { Product } from "../core/model/interfaces/Product";
import { ProductPageModel } from "../interfaces/ProductPageModel";
import { ImageViewModel } from "../interfaces/ProductViewModel";



export class ShopPageViewPresenter {

    public static productPageModel(input: IPluralResponse<Product>): ProductPageModel {
        const entities = input.data;
        const listProduct = entities.map((entity: Entity<Product>)=> {
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