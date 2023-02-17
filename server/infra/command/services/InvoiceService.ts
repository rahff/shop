import { Data } from "../interfaces/Data";
import { InvoiceDto } from "../../../core/dto/InvoiceDto";
import { IInvoiceService } from "../../../core/interfaces/IInvoiceService";
import { IHttpService } from "../../shared/http/IHttpService";



export class InvoiceService implements IInvoiceService{

    private invoiceBaseUrl = "/api/invoices";

    constructor(private http: IHttpService){}
    
    async getInvoiceByCartId(cartId: number): Promise<InvoiceDto | null> {
        const response = await this.http.find<InvoiceDto>(this.invoiceBaseUrl+`?filters[cart]=${cartId}&populate[0]=shipping_address`);
        if(!response) return null;
        return response.data[0];
    }

    async save(invoice: InvoiceDto): Promise<InvoiceDto> {
        const invoiceData = {data: invoice};
        const queryParams = "?populate[0]=shipping_address"
        const response = await this.http.put<Data<InvoiceDto>, InvoiceDto>( this.invoiceBaseUrl+`/${invoice.id}${queryParams}`, invoiceData);
        return response.data;
    }
   
}