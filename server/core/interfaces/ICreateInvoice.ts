import { InvoiceDto } from "../dto/InvoiceDto";

export interface ICreateInvoice {
    createInvoice(invoice: InvoiceDto): Promise<InvoiceDto>;
}