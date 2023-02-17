import { ConfirmInvoiceCommand, ShippingAddressDto } from "../../core/command/ConfirmInvoiceCommand";
import { ShippingAddress } from "../../core/model/valueObjects/ShippingAddress";
import { InvoiceManager } from "../../core/use-cases/InvoiceManager";
import { CartValidatedEvent } from "../../core/events/CartValidatedEvent";
import { AccountServiceStub } from "../../infra/shared/stubs/command/AccountServiceStub";
import { CartServiceStub } from "../../infra/shared/stubs/command/CartServiceStub";
import { EventBusStub } from "../../infra/shared/stubs/command/EventBusStub";
import { InvoiceServiceStub } from "../../infra/shared/stubs/command/InvoiceServiceStub";




describe("InvoiceManager", ()=>{

    let sut: InvoiceManager;

    beforeEach(()=>{
        sut = new InvoiceManager(new InvoiceServiceStub(), new AccountServiceStub());
    })
    

    it('shipping address must be added while confirmation', async ()=>{
        const shippingAddressDto: ShippingAddressDto = {numero: "12b", street: "rue du pont", city: "Paris", zipCode: "7500", country: "France", name: "Bibou Charles"}
        const command: ConfirmInvoiceCommand = {cartId: 5, shippingAddress: shippingAddressDto, token: "usertokenjwt"};
        const confirmedInvoice = await sut.confirmInvoice(command);
        expect(confirmedInvoice.paid).toBeFalse();
        expect(confirmedInvoice.cart).toBe(5);
        expect(confirmedInvoice.customerId).toBe(10);
        expect(confirmedInvoice.shipping_address).toEqual(shippingAddressDto);
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