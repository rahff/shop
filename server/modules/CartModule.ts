import { CartManager } from "../core/use-cases/CartManager";
import { CartService } from "../services/CartService";
import { AccountModule } from "./AccountModule";
import { HttpModule } from "./HttpModule";
import { ProductModule } from "./ProductModule";



export class CartModule {
    private static cartService = new CartService(HttpModule.HttpService());
    private static cartManager = new CartManager(CartModule.cartService, ProductModule.ProductService(), AccountModule.AccountSevice());

    public static CartManager(): CartManager {
        return CartModule.cartManager;
    }

    public static CartService(): CartService {
        return CartModule.cartService;
    }
}