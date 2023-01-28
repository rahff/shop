import { InvoiceManager } from "../../core/use-cases/InvoiceManager";
import { CartServiceStub } from "../stubs/CartServiceStub";
import { EventBusStub } from "../stubs/EventBusStub";
import { InvoiceServiceStub } from "../stubs/InvoiceServiceStub";



describe("InvoiceManager", ()=>{

    let sut: InvoiceManager;

    beforeEach(()=>{
        sut = new InvoiceManager(new CartServiceStub(new EventBusStub()), new InvoiceServiceStub());
    })
    it('new invoice is initaialize as unpaid', async ()=>{
        const eventData = { cartId: 5, customerId: 1 };
        const invoice = await sut.createInvoice(eventData);
        expect(invoice.isPaid()).toBeFalse();
    })

    it('invoice must have the corresponding amount of his cart', async ()=>{
        const eventData = { cartId: 5, customerId: 1 };
        const invoice = await sut.createInvoice(eventData);
        expect(invoice.getAmount()).toEqual(25.99);
    })
})