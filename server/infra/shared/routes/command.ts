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
        this.router.get('/cart/add',this.cartController.addCartItem.bind(this.cartController));

        this.router.get('/cart/remove-item', this.cartController.removeCartItem.bind(this.cartController));

        this.router.get('/cart/decrement-item', this.cartController.decrementCartItem.bind(this.cartController));

        this.router.get("/cart/validate", this.cartController.validateCart.bind(this.cartController));

        this.router.post("/auth/local/register", this.userController.register.bind(this.userController));

    }

    public getRouterInstance(): Router {
        return this.router;
    }
}



