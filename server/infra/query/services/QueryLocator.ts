import axios from "axios";
import { IHttpService } from "../../shared/http/IHttpService";
import { HttpService } from "../../shared/http/HttpService";
import { HttpServiceStub } from "../../shared/stubs/HttpServiceStub";
import { IQueryCart } from "../interfaces/IQueryCart";
import { QueryCart } from "./QueryCart";
import { IQueryAccount } from "../interfaces/IQueryAccount";
import { QueryAccount } from "./QueryAccount";
import { IQueryInvoice } from "../interfaces/IQueryInvoice";
import { QueryInvoice } from "./QueryInvoice";
import { QueryProduct } from "./QueryProduct";
import { IQueryProduct } from "../interfaces/IQueryProduct";
import { IAuthHttpService } from "../../shared/http/IAuthHttp";
import { HttpUserPlugin } from "../../shared/http/HttpUserPlugin";
import { HttpUserPluginStub } from "../../shared/stubs/HttpUserPluginStub";


export class QueryLocator {

    private API_URL: string = process.env.API_URL || "http://localhost:1337";
    
    constructor(private testMode: boolean){}

    private getHttpSevice(testMode: boolean): IHttpService {
        return !testMode 
        ? new HttpService(axios.create(), this.API_URL) 
        : new HttpServiceStub();
    }

    public CartQuery(): IQueryCart {
        return new QueryCart(this.getHttpSevice(this.testMode));
    }

    public AccountQuery(): IQueryAccount {
        return new QueryAccount(this.getHttpUserPlugin(this.testMode));
    }

    private getHttpUserPlugin(testMode: boolean): IAuthHttpService {
        return !testMode 
        ? new HttpUserPlugin(axios.create(), this.API_URL) 
        : new HttpUserPluginStub();
    }

    public InvoiceQuery(): IQueryInvoice {
        return new QueryInvoice(this.getHttpSevice(this.testMode));
    }

    public ProductQuery(): IQueryProduct {
        return new QueryProduct(this.getHttpSevice(this.testMode));
    }
}