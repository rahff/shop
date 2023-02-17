import { IHttpService } from "../../shared/http/IHttpService";
import { IQueryInvoice } from "../interfaces/IQueryInvoice";



export class QueryInvoice implements IQueryInvoice{

    private invoiceBaseUrl = "/api/invoices";

    constructor(private http: IHttpService){}
    
   
}