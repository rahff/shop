import { CartManager } from "../core/use-cases/CartManager";
import { CartEventBus } from "../services/CartEventBus";
import { CartService } from "../services/CartService";
import { AccountModule } from "./AccountModule";
import { HttpModule } from "./HttpModule";
import { ProductModule } from "./ProductModule";



export class CartModule {
    private static cartService = new CartService(HttpModule.HttpService(), new CartEventBus());
    private static cartManager = new CartManager(CartModule.CartService(), ProductModule.ProductService(), AccountModule.AccountSevice());

    private static CartManager(): CartManager {
        return CartModule.cartManager;
    }

    private static CartService(): CartService {
        return CartModule.cartService;
    }

    public static providers(): {manager: CartManager, service: CartService} {
        return {manager: CartModule.CartManager(), service: CartModule.CartService()}
    }
}