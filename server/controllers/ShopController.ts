import { Request, Response } from "express";
import { ProductModule } from "../modules/ProductModule";
import { ShopPageViewPresenter } from "../viewModel/ShopPageViewPresenter";



export const shopPageController = async (req: Request, res: Response) => {
    try {
      const service = ProductModule.ProductService();
      const page = Number(req.query["page"] || "1");
      const apiResult = await service.getProductPage(page);  
      const productPage = ShopPageViewPresenter.productPageModel(apiResult);
      res.render("index", {productPage});
    } catch (error) {
      res.status(500).render("error");
    }
}

export const getProductPageController = async (req: Request, res: Response) => {
    const _ = Number(req.params.id);
    res.render("product_page");
  }