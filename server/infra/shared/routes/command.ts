import { Router } from "express";
import { CartController } from "../../command/controller/CartController";
import { UserConnexionController } from "../../command/controller/UserConnexionController";



export class CommandRouter {
    
    private router: Router;

    constructor(private cartController: CartController, private userController: UserConnexionController) {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/cart/add',this.cartController.addCartItemController.bind(this.cartController));

        this.router.get('/cart/remove-item', this.cartController.removeCartItemController.bind(this.cartController));

        this.router.get('/cart/decrement-item', this.cartController.decrementCartItemController.bind(this.cartController));

        this.router.get("/cart/validate", this.cartController.validateCartController.bind(this.cartController));

        this.router.post("/auth/local/register", this.userController.registerController.bind(this.userController));

    }
    public getRouterInstance(): Router {
        return this.router;
    }
}



