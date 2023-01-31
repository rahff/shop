import { Router } from "express";
import { getCartViewController } from "../controllers/CartController";
import { getInvoicePageController, getProductPageController, shopPageController } from "../controllers/ShopController";
import { getLoginViewController, getRegisterViewController, getForgotPasswordViewController } from "../controllers/UserConnexionController";

const router = Router();

router.get('', shopPageController);

router.get("/login",getLoginViewController);

router.get('/register', getRegisterViewController);

router.get('/forgot_password', getForgotPasswordViewController);

router.get('/cart', getCartViewController);

router.get('/product/:id', getProductPageController);

router.get('/invoice', getInvoicePageController);

export default router;
