import { IInvoiceService } from "../../core/interfaces/IInvoiceService";
import { Invoice } from "../../core/model/entities/Invoice";

export class InvoiceServiceStub implements IInvoiceService {


    async createInvoice(invoice: Invoice): Promise<Invoice> {
        return invoice;
    }

}