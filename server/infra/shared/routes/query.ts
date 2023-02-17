import { Router } from "express";
import { QueryCartController } from "../../query/controllers/CartController";
import { QueryShopController } from "../../query/controllers/ShopController";
import { QueryUserController } from "../../query/controllers/UserConnexionController";



export class QueryRouter {
    
    private router: Router;

    constructor(private queryCartController: QueryCartController, 
                private queryUserController: QueryUserController,
                private queryShopController: QueryShopController) {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('', this.queryShopController.shopPage.bind(this.queryShopController));

        this.router.get("/login",this.queryUserController.getLoginView.bind(this.queryUserController));

        this.router.get('/forgot_password', this.queryUserController.getForgotPasswordView.bind(this.queryUserController));

        this.router.get('/cart', this.queryCartController.getCartView.bind(this.queryCartController));

        this.router.get('/product/:id', this.queryShopController.getProductPage.bind(this.queryShopController));

        this.router.get('/invoice', this.queryShopController.getInvoicePage.bind(this.queryShopController));

        this.router.post("/api/auth/local", this.queryUserController.login.bind(this.queryUserController));
    }

    public getRouterInstance(): Router {
        return this.router;
    }
}


