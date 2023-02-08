import { Request, Response } from "express";
import { ShopPageViewPresenter } from "../viewModel/ShopPageViewPresenter";
import { serviceLocator } from "../services/ServiceLocator";


export const shopPageController = async (req: Request, res: Response) => {
    try {
      const service = serviceLocator.ProductService();
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
    //getProduct
    res.render("product_page");
}

export const getInvoicePageController = async (req: Request, res: Response) => {
    res.render("invoice");
}