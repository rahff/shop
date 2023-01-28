import { IInvoiceService } from "../core/interfaces/IInvoiceService";
import { Invoice } from "../core/model/entities/Invoice";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { JsonInvoiceIn } from "../interfaces/JsonInvoiceIn";
import { JsonInvoiceOut } from "../interfaces/JsonInvoiceOut";
import { EntityMapper } from "./EntityMapper";
import { HttpService } from "./HttpService";



export class InvoiceService implements IInvoiceService{

    private invoiceBaseUrl = "/api/invoices";

    constructor(private http: HttpService){}

    async createInvoice(invoice: Invoice): Promise<Invoice> {
        const invoiceJson = EntityMapper.InvoiceToJsonOut(invoice);
        await this.http.post<IStrapiSingleResponse<JsonInvoiceIn>, JsonInvoiceOut>(this.invoiceBaseUrl, invoiceJson);
        return invoice;
    }

   
}