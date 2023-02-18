import { QueryCartController } from "../../query/controllers/CartController";
import { QueryShopController } from "../../query/controllers/ShopController";
import { QueryUserController } from "../../query/controllers/UserConnexionController";
import { QueryLocator } from "../../query/services/QueryLocator";
import { QueryRouter } from "./query";
import { CartController } from "../../command/controller/CartController";
import { UserConnexionController } from "../../command/controller/UserConnexionController";
import { ServiceLocator } from "../../command/services/ServiceLocator";
import { CommandRouter } from "./command";



export class RouterFactory {

    private static isTest: boolean = !!process.env.TEST;
    private static serviceLocator = new ServiceLocator(this.isTest);
    private static queryLocator = new QueryLocator(this.isTest);

    public static CommandRouter(): CommandRouter {
        return new CommandRouter(
        new CartController(this.serviceLocator.CartManager(), this.serviceLocator.CartEventBus()), 
        new UserConnexionController(this.serviceLocator.AccountService()));
    }

    public static QueryRouter(): QueryRouter {
        return new QueryRouter(
        new QueryCartController(this.queryLocator.CartQuery()), 
        new QueryUserController(this.queryLocator.AccountQuery()), 
        new QueryShopController(this.queryLocator.ProductQuery()));
    }
}