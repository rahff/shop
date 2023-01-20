import { Router, Request, Response } from "express";
import { ServiceContainer } from "../containers/ServiceContainer";
import { ShopPageViewPresenter } from "../services/ShopPageViewPresenter";

const router = Router();

/* GET home page. */
router.get('', async (req: Request, res: Response) => {
  const service = ServiceContainer.ProductService();
  const apiResult = await service.getPage();  
  const productPage = ShopPageViewPresenter.productPageModel(apiResult);
  
  res.render("index", {productPage});
});

router.get("/login", async (req: Request, res: Response) => {
  res.render("login");
});

router.get('/register', async (req: Request, res: Response) => {
  res.render("register");
});

router.get('/forgot_password', async (req: Request, res: Response) => {
  res.render("forgot");
});

router.get('/cart', async (req: Request, res: Response) => {
  res.render("cart");
});

router.get('/product', async (req: Request, res: Response) => {
  res.render("product_page");
});

export default router;
