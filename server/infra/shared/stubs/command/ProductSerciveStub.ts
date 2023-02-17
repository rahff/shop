import { ProductDto } from "../../../../core/dto/ProductDto";
import { IProductService } from "../../../../core/interfaces/IProductService";





export class ProductServiceStub implements IProductService {

    private data: ProductDto[] = [{ id: 1, images: "" , name: "chocolat", price: 19.99,packaging: "500g"}, { id: 2, images: "" , name: "chocolat", price: 19.99,packaging: "300g"}]
     

    async getProductById(id: number): Promise<ProductDto> {
        const foundedProduct = this.data.find((prod: ProductDto) => prod.id === id);
        if(!foundedProduct) throw new Error("404 not found");
        return foundedProduct;
    }

}