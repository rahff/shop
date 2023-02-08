import { IInvoiceService } from "../core/interfaces/IInvoiceService";
import { Invoice } from "../core/model/entities/Invoice";
import { IHttpService } from "../interfaces/IHttpService";
import { IPluralResponse } from "../interfaces/IPluralResponse";
import { IStrapiSingleResponse } from "../interfaces/IStrapiSingleResponse";
import { JsonInvoiceIn } from "../interfaces/JsonInvoiceIn";
import { JsonConfirmedInvoiceOut, JsonInvoiceOut } from "../interfaces/JsonInvoiceOut";
import { EntityMapper } from "./EntityMapper";



export class InvoiceService implements IInvoiceService{

    private invoiceBaseUrl = "/api/invoices";

    constructor(private http: IHttpService){}
    
    async getInvoiceByCartId(cartId: number): Promise<Invoice | null> {
        const response = await this.http.get<IPluralResponse<JsonInvoiceIn>>(this.invoiceBaseUrl+`?filters[cart]=${cartId}&populate[0]=shipping_address`);
        if(!response) return null;
        return EntityMapper.JsonToInvoice(response.data);
    }
    
    async createInvoice(invoice: Invoice): Promise<Invoice> {
        const invoiceJson = EntityMapper.InvoiceToJsonOut(invoice);
        await this.http.post<IStrapiSingleResponse<JsonInvoiceIn>, JsonInvoiceOut>(this.invoiceBaseUrl, invoiceJson);
        return invoice;
    }
    
    async save(invoice: Invoice): Promise<Invoice> {
        const invoiceJson = EntityMapper.ConfirmedInvoiceToJsonOut(invoice);
        const response = await this.http.put<IStrapiSingleResponse<JsonInvoiceIn>, JsonConfirmedInvoiceOut >(this.invoiceBaseUrl+`/${invoice.getId()}?populate[0]=shipping_address`, invoiceJson);
        return EntityMapper.SingleJsonToInvoice(response.data);
    }
   
}