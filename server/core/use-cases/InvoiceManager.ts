import { ICartService } from "../interfaces/ICartService";
import { IInvoiceService } from "../interfaces/IInvoiceService";
import { Invoice } from "../model/entities/Invoice";

export class InvoiceManager {

    constructor(private cartService: ICartService, private invoiceService: IInvoiceService){}
    
    async createInvoice(eventData: {cartId: number, customerId: number}): Promise<Invoice> {
        const cart = await this.cartService.getCartOrNothing(eventData.cartId);
        if(!cart) throw new Error("cart not found");
        const invoice = new Invoice(eventData.customerId, eventData.cartId);
        invoice.computeAmount(cart.getItems());
        await this.invoiceService.createInvoice(invoice);
        return invoice;
    }
}