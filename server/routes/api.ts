import { Router } from "express";
import {
  addCartItemController, 
  removeCartItemController, 
  decrementCartItemController, 
  getCartController, 
  validateCartController
} from "../controllers/CartController";

const router = Router();


router.get('/cart/add', addCartItemController);

router.get('/cart/remove-item', removeCartItemController);

router.get('/cart/decrement-item', decrementCartItemController);

router.get("/cart/get/:id", getCartController);

router.get("/cart/validate", validateCartController);

export default router;
