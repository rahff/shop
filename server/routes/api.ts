import { Router } from "express";
import {
  addCartItemController, 
  removeCartItemController, 
  decrementCartItemController, 
  getCartController, 
  validateCartController
} from "../controllers/CartController";
import { loginController, registerController } from "../controllers/UserConnexionController";

const router = Router();


router.get('/cart/add', addCartItemController);

router.get('/cart/remove-item', removeCartItemController);

router.get('/cart/decrement-item', decrementCartItemController);

router.get("/cart/get/:id", getCartController);

router.get("/cart/validate", validateCartController);

router.post("/auth/local", loginController);

router.post("/auth/local/register", registerController);

export default router;
