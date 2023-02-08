import { RawAxiosRequestConfig } from "axios";
import { readFileSync } from "fs";
import { IHttpService } from "../../interfaces/IHttpService";
import { resolve } from "path";



export class HttpServiceStub implements IHttpService {

    private baseUrl = "../../../data/"

    async get<TResponse>(url: string, config?: RawAxiosRequestConfig<any> | undefined): Promise<TResponse | null> {
        
        switch (url) {
            case "/api/carts/1?populate[0]=items&populate[1]=customer":
                const cartJson = this.loadFile(`${this.baseUrl}getCart.json`);
                return JSON.parse(cartJson);

            case "/api/users/me":
                const userJson = this.loadFile(`${this.baseUrl}authenticate.json`);
                return JSON.parse(userJson);
                
            case "/api/products?populate[0]=images&pagination[page]=1&pagination[pageSize]=6":
                const productPageJson = this.loadFile(`${this.baseUrl}getProductPage.json`);
                return JSON.parse(productPageJson);

            case "/api/products/1?populate[0]=images":
                const responseJson = this.loadFile(`${this.baseUrl}getProduct.json`);
                return JSON.parse(responseJson);

            case "/api/invoices?filters[cart]=1&populate[0]=shipping_address":
                const invoiceResponse = this.loadFile(`${this.baseUrl}getInvoiceByCart.json`);
                return JSON.parse(invoiceResponse);

            default: throw new Error("404 not found");
        }
    }

    async post<TResponse, TData>(url: string, data: TData): Promise<TResponse> {

        switch (url) {
            case "/api/auth/local/register":
                const registerResponse = this.loadFile(`${this.baseUrl}register.json`);
                return JSON.parse(registerResponse);

            case "/api/auth/local":
                const loginResponse = this.loadFile(`${this.baseUrl}login.json`)
                return JSON.parse(loginResponse);

            case "/api/carts?populate[0]=items&populate[1]=customer":
                const newCartResponse = this.loadFile(`${this.baseUrl}createCart.json`);
                return JSON.parse(newCartResponse);

            case "/api/invoices":
                const invoiceResponse = this.loadFile(`${this.baseUrl}createInvoice.json`);
                return JSON.parse(invoiceResponse);

            default: throw new Error("404 not found");
        }
    }

    async put<TResponse, TData>(url: string, data: any): Promise<TResponse> {
    
        switch (url) {
            case "/api/carts/1?populate[0]=items&populate[1]=customer":
                const path = data.data.validated ? "validateCart.json" : "saveCart.json";
                const cartResponse = this.loadFile(`${this.baseUrl}${path}`);
                return JSON.parse(cartResponse);
        
            case "/api/invoices/1?populate[0]=shipping_address":
               
                const invoiceResponse = this.loadFile(`${this.baseUrl}saveInvoice.json`);
                return JSON.parse(invoiceResponse);
        
            default: throw new Error("404 not found");
        }
    }

    private loadFile(path: string): string {
        return readFileSync(resolve(__dirname, "../data/"+path), {encoding: "utf8"});
    }

}