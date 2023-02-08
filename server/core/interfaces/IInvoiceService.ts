import { Invoice } from "../model/entities/Invoice";

export interface IInvoiceService {
    createInvoice(invoice: Invoice): Promise<Invoice>;
    save(invoice: Invoice): Promise<Invoice>;
    getInvoiceByCartId(cartId: number): Promise<Invoice | null>;

}