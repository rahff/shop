import { ProductDto } from "../../../core/dto/ProductDto";
import { ProductStrapiDto } from "../interfaces/ProductStrapiDto";

export class DtoMapper {

    public static toProductDto(strapiDto: ProductStrapiDto): ProductDto {
        return {
            id: strapiDto.id,
            images: strapiDto.images[0].thumbnail,
            name: strapiDto.name,
            packaging: strapiDto.package,
            price: strapiDto.price
        }
    }
}