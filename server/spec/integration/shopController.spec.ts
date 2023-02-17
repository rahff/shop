import { IQueryProduct } from "../../infra/query/interfaces/IQueryProduct";
import { ConfirmInvoiceCommand } from "../../core/command/ConfirmInvoiceCommand";
import { ShopPageViewPresenter } from "../../infra/query/viewModel/ShopPageViewPresenter";
import { IInvoiceManager } from "../../shared/IInvoiceManager";
import { ServiceLocator } from "../../infra/command/services/ServiceLocator";
import { QueryLocator } from "../../infra/query/services/QueryLocator";



describe("ProductController", () => {
    
    const queryLocator = new QueryLocator(true);

  describe('Query', ()=> {
    let productService: IQueryProduct;

    beforeEach(() => {
      productService = queryLocator.ProductQuery();
    });

    it("getProductPageController", async () => {
      const apiResult = await productService.getProductPage(1);
      const productPage = ShopPageViewPresenter.productPageModel(apiResult);
      expect(productPage).toBeTruthy();
    });
  
    it("getProductDetailPageController", async () => {
      const response = await productService.getProductDetail(1);
      const productDetailViewModel =
        ShopPageViewPresenter.productDetailModel(response);
      expect(productDetailViewModel.productName).toEqual("Lotus bleu 500g");
      expect(productDetailViewModel.images).toContain({
        alt: "null",
        small: "/uploads/small_lotus_bleu_fleurs2_7dd0265400.jpg",
        thumbnail: "/uploads/thumbnail_lotus_bleu_fleurs2_7dd0265400.jpg",
        url: "/uploads/lotus_bleu_fleurs2_7dd0265400.jpg",
      });
    });

  })


});
describe("Invoice Controller", () => {

  const serviceLocator = new ServiceLocator(true);
  let invoiceManger: IInvoiceManager;

  beforeEach(() => {
    invoiceManger = serviceLocator.InvoiceManager();
  });
  
  it("customer confirm the invoice when adding his shipping address", async () => {
    const command: ConfirmInvoiceCommand = {
      cartId: 1,
      shippingAddress: {
        numero: "12b",
        street: "Brandon street",
        city: "New York",
        country: "USA",
        zipCode: "15000",
        name: "Davidson Henry",
      },
      token: "jwtToken",
    };
    const confirmedInvoice = await invoiceManger.confirmInvoice(command);
    expect(confirmedInvoice.customerId).toBeTruthy();
    expect(confirmedInvoice.shipping_address).toBeTruthy();
  });
});
