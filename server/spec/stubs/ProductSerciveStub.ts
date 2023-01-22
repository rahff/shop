import { Entity } from "../../core/model/interfaces/Entity";
import { Image } from "../../core/model/interfaces/Image";
import { IProductService } from "../../core/model/interfaces/IProductService";
import { Product } from "../../core/model/interfaces/Product";

export class ProductServiceStub implements IProductService {

    private image: Entity<Image> = { id: 5, attributes: {formats: {thumbnail: { url: "url_image"} }}} as Entity<Image>;
    private data: Entity<Product>[] = [
        {id: 1, attributes: 
            {brand: "", images: {data: [this.image]},
            long_description: "", name: "chocolat", package: "500g", price: 19.99, promotion: 0, short_description: "", variation: "200g"}}, {id: 2, attributes: {brand: "", images: {data: [this.image]}, long_description: "", name: "café", package: "500g", price: 19.99, promotion: 0, short_description: "", variation: "200g"}}]
    async getProductById(id: number): Promise<Entity<Product>> {
        const foundedProduct = this.data.find((prod: Entity<Product>) => prod.id === id);
        if(!foundedProduct) throw new Error("404 not found");
        return foundedProduct;
    }

    getProductPage(page: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

}