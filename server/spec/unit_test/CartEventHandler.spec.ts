import { CartValidatedEvent } from "../../core/events/CartValidatedEvent";
import { CartEventHandler } from "../../core/handlers/CartEventHandler"
import { InvoiceServiceStub } from "../../infra/shared/stubs/command/InvoiceServiceStub";



describe("CartEventHandler", ()=> {
    let cartEventHandler: CartEventHandler;
    beforeEach(()=> {
        cartEventHandler = new CartEventHandler(new InvoiceServiceStub());
    })

    it('new invoice is initialize as unpaid', async ()=>{
        const eventData = new CartValidatedEvent({amount: 19.99, customerId: 10, id: 7, items: [ 
            {product_id: 1, product_name: "test", product_price: 10, image_url: "url", quantity: 1, amount: 10},
            {product_id: 2, product_name: "test2", product_price: 15.99, image_url: "url2", quantity: 1, amount: 15.99}], validated: true});
        const invoice = await cartEventHandler.onCartValidated(eventData);
        expect(invoice.paid).toBeFalse();
        expect(invoice.amount).toEqual(25.99);
    })
})