import { InvoiceDto } from "../dto/InvoiceDto";



export interface IInvoiceService {
    save(invoice: InvoiceDto): Promise<InvoiceDto>;
    getInvoiceByCartId(cartId: number): Promise<InvoiceDto | null>;

}