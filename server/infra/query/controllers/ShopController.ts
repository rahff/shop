import { Request, Response } from "express";
import { IQueryProduct } from "../interfaces/IQueryProduct";
import { ShopPageViewPresenter } from "../viewModel/ShopPageViewPresenter";


export class QueryShopController {

  constructor(private queryProduct: IQueryProduct) {}

  async shopPage(req: Request, res: Response) {
    try {
      const page = Number(req.query["page"] || "1");
      const apiResult = await this.queryProduct.getProductPage(page);
      const productPage = ShopPageViewPresenter.productPageModel(apiResult);
      res.json({data: productPage})
    } catch (error: any) {
      console.log(error.message);
      
      res.status(500).render("error");
    }
  }

  async  getProductPage(req: Request, res: Response) {
    const _ = Number(req.params.id);
    //getProduct
    res.render("product_page");
  }

  async getInvoicePage(req: Request, res: Response) {
    res.render("invoice");
  }
}
