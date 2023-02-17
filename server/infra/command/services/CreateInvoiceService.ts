import { InvoiceDto } from "../../../core/dto/InvoiceDto";
import { ICreateInvoice } from "../../../core/interfaces/ICreateInvoice";
import { IHttpService } from "../../shared/http/IHttpService";
import { Data } from "../interfaces/Data";

export class CreateInvoiceService implements ICreateInvoice {

    private invoiceBaseUrl = "/api/invoices";
    
    constructor(private http: IHttpService){}
    
    async createInvoice(invoice: InvoiceDto): Promise<InvoiceDto> {
        const invoiceData = {data: invoice};
        const response = await this.http.post<Data<InvoiceDto>, InvoiceDto>(this.invoiceBaseUrl, invoiceData);
        return response.data;
    }
    
}