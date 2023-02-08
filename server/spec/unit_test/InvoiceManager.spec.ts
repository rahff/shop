import { ConfirmInvoiceCommand, ShippingAddressDto } from "../../core/command/ConfirmInvoiceCommand";
import { ShippingAddress } from "../../core/model/valueObjects/ShippingAddress";
import { InvoiceManager } from "../../core/use-cases/InvoiceManager";
import { AccountServiceStub } from "../stubs/AccountServiceStub";
import { CartServiceStub } from "../stubs/CartServiceStub";
import { EventBusStub } from "../stubs/EventBusStub";
import { InvoiceServiceStub } from "../stubs/InvoiceServiceStub";



describe("InvoiceManager", ()=>{

    let sut: InvoiceManager;

    beforeEach(()=>{
        sut = new InvoiceManager(new CartServiceStub(new EventBusStub()), new InvoiceServiceStub(), new AccountServiceStub());
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

    it('shipping address must be added while confirmation', async ()=>{
        const shippingAddressDto: ShippingAddressDto = {numero: "12b", street: "rue du pont", city: "Paris", zipCode: "7500", country: "France", name: "Bibou Charles"}
        const command: ConfirmInvoiceCommand = {cartId: 5, shippingAddress: shippingAddressDto, token: "usertokenjwt"};
        const confirmedInvoice = await sut.confirmInvoice(command);
        expect(confirmedInvoice.isPaid()).toBeFalse();
        expect(confirmedInvoice.getCartId()).toBe(5);
        expect(confirmedInvoice.getCustomerId()).toBe(10);
        expect(confirmedInvoice.getShippingAddress()).toEqual(ShippingAddress.of(shippingAddressDto));
    });
    
    it('unauthenticated customer cannot confirm invoice ', async ()=>{
        const shippingAddressDto: ShippingAddressDto = {numero: "12b", street: "rue du pont", city: "Paris", zipCode: "7500", country: "France", name: "Bibou Charles"}
        const command: ConfirmInvoiceCommand = {cartId: 5, shippingAddress: shippingAddressDto, token: "invalidToken"};
        try {
            await sut.confirmInvoice(command);
            throw new Error("unexpected error");
        } catch (error: any) {
            expect(error.message).toBe("401 unauthorized");
        }
    })
})