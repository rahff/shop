import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { InvoiceFactory } from "../model/factories/InvoiceFactory";
import { CartItemFactory } from "../model/factories/CartItemFactory";
import { InvoiceDto } from "../dto/InvoiceDto";
import { ICreateInvoice } from "../interfaces/ICreateInvoice";



export class CartEventHandler {
    
    constructor(private invoiceService: ICreateInvoice){}

    public async onCartValidated(event: CartValidatedEvent): Promise<InvoiceDto> {
        try {
            const data = event.getData();
            const invoice = InvoiceFactory.create(data.customerId, data.id);
            invoice.computeAmount(CartItemFactory.fromArray(data.items));
            return await this.invoiceService.createInvoice(invoice.asDto());
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}
