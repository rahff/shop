import { CartManager } from "../../core/use-cases/CartManager";
import { AccountServiceStub } from "./AccountServiceStub";
import { CartServiceStub } from "./CartServiceStub";
import { EventBusStub } from "./EventBusStub";
import { ProductServiceStub } from "./ProductSerciveStub";

export class CartModuleTest {

    public CartManger(): CartManager {
        return new CartManager(new CartServiceStub(new EventBusStub()), new ProductServiceStub(), new AccountServiceStub())
    } 
}

