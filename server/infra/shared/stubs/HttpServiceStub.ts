import { RawAxiosRequestConfig } from "axios";
import { readFileSync } from "fs";
import { resolve } from "path";
import { IHttpService } from "../http/IHttpService";
import { FindOneResponse, FindResponse, StrapiMapper } from "strapi-adapter";


export class HttpServiceStub implements IHttpService {

    private baseUrl = "../../../data/";
    private mapper: StrapiMapper = new StrapiMapper()

    async find<TResponse>(url: string, config?: RawAxiosRequestConfig<any> | undefined): Promise<FindResponse<TResponse> | null> {
        
        switch (url) {
            
            case "/api/products?populate[0]=images&pagination[page]=1&pagination[pageSize]=6":
                const productPageJson = this.loadFile(`${this.baseUrl}getProductPage.json`);
                return this.mapper.mapResponse(JSON.parse(productPageJson));

            case "/api/invoices?filters[cart]=1&populate[0]=shipping_address":
                const invoiceResponse = this.loadFile(`${this.baseUrl}getInvoiceByCart.json`);
                return this.mapper.mapResponse(JSON.parse(invoiceResponse));

            default: throw new Error("404 not found");
        }
    }

    async findOne<TResponse>(url: string, config?: RawAxiosRequestConfig<any> | undefined): Promise<FindOneResponse<TResponse>> {
        switch (url) {
            case "/api/carts/1?populate[0]=items&populate[1]=customer":
                const cartJson = this.loadFile(`${this.baseUrl}getCart.json`);
                return this.mapper.mapFindOneResponse(JSON.parse(cartJson));               

            case "/api/products/1?populate[0]=images":
                const responseJson = this.loadFile(`${this.baseUrl}getProduct.json`);
                return this.mapper.mapFindOneResponse(JSON.parse(responseJson));

            default: throw new Error("404 not found");
        }
    }

    async post<TResponse, TData>(url: string, data: TData): Promise<FindOneResponse<TResponse>> {

        switch (url) {
            
            case "/api/carts?populate[0]=items&populate[1]=customer":
                const newCartResponse = this.loadFile(`${this.baseUrl}createCart.json`);
                return this.mapper.mapFindOneResponse(JSON.parse(newCartResponse));

            case "/api/invoices":
                const invoiceResponse = this.loadFile(`${this.baseUrl}createInvoice.json`);
                return this.mapper.mapFindOneResponse(JSON.parse(invoiceResponse));

            default: throw new Error("404 not found");
        }
    }

    async put<TResponse, TData>(url: string, data: any): Promise<FindOneResponse<TResponse>> {
    
        switch (url) {
            case "/api/carts/1?populate[0]=items&populate[1]=customer":
                const path = data.data.validated ? "validateCart.json" : "saveCart.json";
                const cartResponse = this.loadFile(`${this.baseUrl}${path}`);
                return this.mapper.mapFindOneResponse(JSON.parse(cartResponse));
        
            case "/api/invoices/1?populate[0]=shipping_address":
               
                const invoiceResponse = this.loadFile(`${this.baseUrl}saveInvoice.json`);
                return this.mapper.mapFindOneResponse(JSON.parse(invoiceResponse));
        
            default: throw new Error("404 not found");
        }
    }

    private loadFile(path: string): string {
        return readFileSync(resolve(__dirname, "../data/"+path), {encoding: "utf8"});
    }

}