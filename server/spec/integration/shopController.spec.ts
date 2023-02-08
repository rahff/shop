import { ConfirmInvoiceCommand } from "../../core/command/ConfirmInvoiceCommand";
import { InvoiceManager } from "../../core/use-cases/InvoiceManager";
import { EntityMapper } from "../../services/EntityMapper";
import { ProductService } from "../../services/ProductService";
import { serviceLocator } from "../../services/ServiceLocator";
import { ShopPageViewPresenter } from "../../viewModel/ShopPageViewPresenter";



describe("ProductController", ()=>{

    let productService: ProductService;

    beforeEach(()=> {
        productService = serviceLocator.ProductService();
    });

    it("getProductPageController", async ()=> {
        const apiResult = await productService.getProductPage(1);  
        const productPage = ShopPageViewPresenter.productPageModel(apiResult);
        expect(productPage).toBeTruthy()
    });

    it("getProductPageController", async ()=> {
       const response = await productService.getProductDetail(1);
       const productDetailViewModel = ShopPageViewPresenter.productDetailModel(response);
       expect(productDetailViewModel.productName).toEqual("Lotus bleu 500g");
       expect(productDetailViewModel.images).toContain({
            small: "/uploads/small_lotus_bleu_fleurs2_7dd0265400.jpg",
            thumbnail: "/uploads/thumbnail_lotus_bleu_fleurs2_7dd0265400.jpg",
            medium: "/uploads/medium_lotus_bleu_fleurs2_7dd0265400.jpg"
        });
    });

})
describe("Invoice Controller", ()=> {

    let invoiceManger: InvoiceManager;
    beforeEach(()=> {
        invoiceManger = serviceLocator.InvoiceManager();
    })
    it("customer confirm the invoice when adding his shipping address", async ()=>{
        const command: ConfirmInvoiceCommand = { cartId: 1, shippingAddress: {
                numero: "12b",
                street: "Brandon street",
                city: "New York",
                country: "USA",
                zipCode: "15000",
                name: "Davidson Henry"
            },
            token: "jwtToken"
        };
        const confirmedInvoice = await invoiceManger.confirmInvoice(command);
        expect(confirmedInvoice.getCustomerId()).toBeTruthy();
        expect(confirmedInvoice.getShippingAddress()).toBeTruthy();
    })
})