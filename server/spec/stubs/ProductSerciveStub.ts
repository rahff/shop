import { IProductService } from "../../core/interfaces/IProductService";
import { Product } from "../../core/model/entities/Product";
import { Image } from "../../interfaces/Image";
import { JsonProduct } from "../../interfaces/JsonProduct";



export class ProductServiceStub implements IProductService {

    private data: JsonProduct[] = [{brand: "", id: 1, images: {data: [{id: 1, attributes: {formats:{ thumbnail: {url: "url_image"} }} as Image}]}, long_description: "", short_description: "", name: "chocolat", price: 19.99, package: "500g", promotion: 0, variation: ""}, {brand: "", id: 2, images: {data: [{id: 1, attributes: {formats:{ thumbnail:{url: "url_image"} }} as Image}]}, long_description: "", short_description: "", name: "chocolat", price: 19.99, package: "300g", promotion: 0, variation: ""}]
     

    async getProductById(id: number): Promise<Product> {
        const foundedProduct = this.data.find((prod: JsonProduct) => prod.id === id);
        if(!foundedProduct) throw new Error("404 not found");
        return new Product(foundedProduct.id, foundedProduct.name, foundedProduct.price, foundedProduct.images.data[0].attributes.formats.thumbnail.url, foundedProduct.package)
    }

    getProductPage(page: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

}