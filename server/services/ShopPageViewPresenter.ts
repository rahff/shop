import { Entity } from "../core/interfaces/Entity";
import { Image } from "../core/interfaces/Image";
import { IStrapiResponse } from "../core/interfaces/IStrapiResponse";
import { Product } from "../core/interfaces/Product";
import { ProductPageModel } from "../interfaces/ProductPageModel";
import { ImageViewModel } from "../interfaces/ProductViewModel";



export class ShopPageViewPresenter {

    public static productPageModel(input: IStrapiResponse<Product>): ProductPageModel {
        const entities = input.data;
        const listProduct = entities.map((entity: Entity<Product>)=> {
                return {
                    name: entity.attributes.name,
                    brand: entity.attributes.brand,
                    long_description: entity.attributes.long_description,
                    price: entity.attributes.price,
                    package: entity.attributes.package,
                    promotion: entity.attributes.promotion,
                    short_description: entity.attributes.short_description,
                    images: ShopPageViewPresenter.mapImages(entity.attributes.images.data),
                    id: entity.id
                }
            });

            return { listProduct, pagination: input.meta.pagination };
    }

    private static mapImages(input: Entity<Image>[]): ImageViewModel[] {
        return input.map((entity: Entity<Image>) => {
            return {
                medium: entity.attributes.formats.medium.url,
                small: entity.attributes.formats.small.url,
                thumbnail: entity.attributes.formats.thumbnail.url
            }
        })
        
    }
}