import { ConfirmInvoiceCommand } from "../command/ConfirmInvoiceCommand";
import { IAccountService } from "../interfaces/IAccountService";
import { ICartService } from "../interfaces/ICartService";
import { IInvoiceService } from "../interfaces/IInvoiceService";
import { Invoice } from "../model/entities/Invoice";
import { ShippingAddress } from "../model/valueObjects/ShippingAddress";

export class InvoiceManager {

    constructor(private cartService: ICartService, private invoiceService: IInvoiceService, private accountService: IAccountService){}
    
    async createInvoice(eventData: {cartId: number, customerId: number}): Promise<Invoice> {
        const cart = await this.cartService.getCartOrNothing(eventData.cartId);
        if(!cart) throw new Error("cart not found");
        const invoice = new Invoice(null, eventData.customerId, eventData.cartId);
        invoice.computeAmount(cart.getItems());
        await this.invoiceService.createInvoice(invoice);
        return invoice;
    }

    async confirmInvoice(command: ConfirmInvoiceCommand): Promise<Invoice> {
        const userId = await this.accountService.getUserIdIfAuthenticated(command.token);
        if(!userId) throw new Error("401 unauthorized");
        const confirmedInvoice = await this.invoiceService.getInvoiceByCartId(command.cartId);
        if(!confirmedInvoice) throw new Error("404 invoice not found");
        confirmedInvoice.addShippingAddress(ShippingAddress.of(command.shippingAddress));
        const savedInvoice = await this.invoiceService.save(confirmedInvoice);
        return savedInvoice;
    }
}