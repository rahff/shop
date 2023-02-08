import axios from "axios";
import { CartManager } from "../core/use-cases/CartManager";
import { InvoiceManager } from "../core/use-cases/InvoiceManager";
import { IHttpService } from "../interfaces/IHttpService";
import { HttpServiceStub } from "../spec/stubs/HttpServiceStub";
import { AccountService } from "./AccountService";
import { CartEventBus } from "./CartEventBus";
import { CartService } from "./CartService";
import { HttpService } from "./HttpService";
import { InvoiceService } from "./InvoiceService";
import { ProductService } from "./ProductService";

class ServiceLocator {

    private API_URL: string = process.env.API_URL || "http://localhost:1337";
    
    constructor(private testMode: boolean){}

    private getHttpSevice(testMode: boolean): IHttpService {
        return !testMode 
        ? new HttpService(axios.create(), this.API_URL) 
        : new HttpServiceStub();
    }

    public CartService(): CartService {
        return new CartService(this.getHttpSevice(this.testMode), new CartEventBus());
    }

    public CartManager(): CartManager {
        return new CartManager(this.CartService(), this.ProductService(), this.AccountService());
    }

    public AccountService(): AccountService {
        return new AccountService(this.getHttpSevice(this.testMode));
    }

    public InvoiceService(): InvoiceService {
        return new InvoiceService(this.getHttpSevice(this.testMode));
    }

    public InvoiceManager(): InvoiceManager {
        return new InvoiceManager(this.CartService(), this.InvoiceService(), this.AccountService());
    }

    public ProductService(): ProductService {
        return new ProductService(this.getHttpSevice(this.testMode));
    }
}

const isTest: string | undefined = process.env.TEST;
export const serviceLocator = new ServiceLocator(!!isTest);