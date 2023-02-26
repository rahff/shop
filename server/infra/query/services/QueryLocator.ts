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
import { AxiosFactory } from "../../shared/http/AxiosFactory";


export class QueryLocator {
    
    constructor(private testMode: boolean){}

    private getHttpSevice(testMode: boolean): IHttpService {
        return !testMode 
        ? new HttpService(AxiosFactory.getQueryInstance()) 
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
        ? new HttpUserPlugin(AxiosFactory.getQueryInstance()) 
        : new HttpUserPluginStub();
    }

    public InvoiceQuery(): IQueryInvoice {
        return new QueryInvoice(this.getHttpSevice(this.testMode));
    }

    public ProductQuery(): IQueryProduct {
        return new QueryProduct(this.getHttpSevice(this.testMode));
    }
}