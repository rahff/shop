import { CartManager } from "../core/use-cases/CartManager";
import { InvoiceManager } from "../core/use-cases/InvoiceManager";
import { CartService } from "../services/CartService";
import { InvoiceService } from "../services/InvoiceService";
import { CartModule } from "./CartModule";
import { InvoiceModule } from "./InvoiceModule";

export class ShopModule {
    private static cartModule = CartModule.providers();
    private static invoiceModuleModule = InvoiceModule.providers();

    public static CartService(): CartService {
        return ShopModule.cartModule.service;
    }

    public static CartManager(): CartManager {
        return ShopModule.cartModule.manager;
    }

    public static InvoiceManager(): InvoiceManager {
        return ShopModule.invoiceModuleModule.manager;
    }

    public static InvoiceService(): InvoiceService {
        return ShopModule.invoiceModuleModule.service;
    }
}