import { IInvoiceService } from "../../core/interfaces/IInvoiceService";
import { Invoice } from "../../core/model/entities/Invoice";

export class InvoiceServiceStub implements IInvoiceService {
    
    private data: Invoice[] = [new Invoice(10, 5)];
    
    async getInvoiceByCartId(cartId: number): Promise<Invoice | null> {
        const foundedInvoice = this.data.find((invoice: Invoice) => invoice.getCartId() === cartId);
        if(foundedInvoice) return foundedInvoice;
        return null;
    }
    
    
    async createInvoice(invoice: Invoice): Promise<Invoice> {
        this.data.push(invoice);
        return invoice;
    }
    
    async save(invoice: Invoice): Promise<Invoice> {
        this.data.push(invoice);
        return invoice;
    }
}