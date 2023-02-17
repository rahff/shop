import { InvoiceDto } from "../../../../core/dto/InvoiceDto";
import { IInvoiceService } from "../../../../core/interfaces/IInvoiceService";


export class InvoiceServiceStub implements IInvoiceService {
    
    private data: InvoiceDto[] = [{amount: 10, cart: 5, customerId: 10, id: 1, paid: false, payment_ref: null, shipping_address: null}];
    
    async getInvoiceByCartId(cartId: number): Promise<InvoiceDto | null> {
        const foundedInvoice = this.data.find((invoice: InvoiceDto) => invoice.cart === cartId);
        if(foundedInvoice) return foundedInvoice;
        return null;
    }
    
    
    async createInvoice(invoice: InvoiceDto): Promise<InvoiceDto> {
        this.data.push(invoice);
        return invoice;
    }
    
    async save(invoice: InvoiceDto): Promise<InvoiceDto> {
        this.data.push(invoice);
        return invoice;
    }
}