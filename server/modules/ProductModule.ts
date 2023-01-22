
import { ProductService } from "../services/ProductService";
import { HttpModule } from "./HttpModule";




export class ProductModule {

    private static productService = new ProductService(HttpModule.HttpService());
    
    public static ProductService(): ProductService {
        return ProductModule.productService;
    }
}