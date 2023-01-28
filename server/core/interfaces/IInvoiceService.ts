import { Invoice } from "../model/entities/Invoice";

export interface IInvoiceService {
    createInvoice(invoice: Invoice): Promise<Invoice>;
}