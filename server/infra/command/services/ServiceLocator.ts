import axios from "axios";
import { CartManager } from "../../../core/use-cases/CartManager";
import { HttpService } from "../../shared/http/HttpService";
import { HttpServiceStub } from "../../shared/stubs/HttpServiceStub";
import { ICartManager } from "../../../shared/ICartManger";
import { IHttpService } from "../../shared/http/IHttpService";
import { AccountService } from "./AccountService";
import { CartEventBus } from "./CartEventBus";
import { CartService } from "./CartService";
import { InvoiceService } from "./InvoiceService";
import { IInvoiceManager } from "../../../shared/IInvoiceManager";
import { InvoiceManager } from "../../../core/use-cases/InvoiceManager";
import { ProductService } from "./ProductService";
import { IAuthHttpService } from "../../shared/http/IAuthHttp";
import { HttpUserPlugin } from "../../shared/http/HttpUserPlugin";
import { HttpUserPluginStub } from "../../shared/stubs/HttpUserPluginStub";
import { ICartService } from "../../../core/interfaces/ICartService";
import { IAccountService } from "../../../core/interfaces/IAccountService";
import { IInvoiceService } from "../../../core/interfaces/IInvoiceService";
import { IProductService } from "../../../core/interfaces/IProductService";
import { CartEventHandler } from "../../../core/handlers/CartEventHandler";
import { ICreateInvoice } from "../../../core/interfaces/ICreateInvoice";
import { CreateInvoiceService } from "./CreateInvoiceService";




export class ServiceLocator {

    private API_URL: string = process.env.API_URL || "http://localhost:1337";
    
    constructor(private testMode: boolean){}

    private getHttpSevice(testMode: boolean): IHttpService {
        return !testMode 
        ? new HttpService(axios.create(), this.API_URL) 
        : new HttpServiceStub();
    }

    public CartService(): CartService {
        return new CartService(this.getHttpSevice(this.testMode));
    }

    public CartManager(): ICartManager {
        return new CartManager(this.CartService(), this.ProductService(), this.AccountService())
    }

    public AccountService(): AccountService {
        return new AccountService(this.getHttpUserPlugin(this.testMode));
    }

    private getHttpUserPlugin(testMode: boolean): IAuthHttpService {
        return !testMode 
        ? new HttpUserPlugin(axios.create(), this.API_URL) 
        : new HttpUserPluginStub();
    }

    public InvoiceService(): InvoiceService {
        return new InvoiceService(this.getHttpSevice(this.testMode));
    }

    public InvoiceManager(): IInvoiceManager {
        return new InvoiceManager(this.InvoiceService(), this.AccountService());
    }

    public ProductService(): ProductService {
        return new ProductService(this.getHttpSevice(this.testMode));
    }

    public CreateInvoiceService(): ICreateInvoice {
        return new CreateInvoiceService(this.getHttpSevice(this.testMode));
    }

    public CartEventBus(): CartEventBus {
        return new CartEventBus(new CartEventHandler(this.CreateInvoiceService()))
    }
}

export class ServiceLocator2 {

    private API_URL: string = process.env.API_URL || "http://localhost:1337";
    private httpService: IHttpService;
    private cartService: ICartService;
    private cartManager: ICartManager;
    private accountService: IAccountService;
    private invoiceService: IInvoiceService;
    private invoiceManager: IInvoiceManager;
    private productService: IProductService;

    constructor(private testMode: boolean){
        this.httpService = this.getHttpSevice(this.testMode);
        this.cartService = new CartService(this.getHttpSevice(this.testMode)); 
        this.productService = new ProductService(this.getHttpSevice(this.testMode));
        this.accountService = new AccountService(this.getHttpUserPlugin(this.testMode));
        this.cartManager = new CartManager(this.cartService, this.productService, this.accountService);
        this.invoiceService = new InvoiceService(this.getHttpSevice(this.testMode));
        this.invoiceManager = new InvoiceManager(this.InvoiceService(), this.AccountService());
    }

    private getHttpSevice(testMode: boolean): IHttpService {
        this.httpService = !testMode 
        ? new HttpService(axios.create(), this.API_URL) 
        : new HttpServiceStub();
        return this.httpService;
    }

    public CartService(): ICartService {
        return this.cartService;
    }

    public CartManager(): ICartManager {
        return this.cartManager;
    }

    public AccountService(): IAccountService {
        return this.accountService;
    }

    private getHttpUserPlugin(testMode: boolean): IAuthHttpService {
        return !testMode 
        ? new HttpUserPlugin(axios.create(), this.API_URL) 
        : new HttpUserPluginStub();
    }

    public InvoiceService(): IInvoiceService {
        return this.invoiceService;
    }

    public InvoiceManager(): IInvoiceManager {
        return this.invoiceManager;
    }

    public ProductService(): IProductService {
        return this.productService;
    }
}

