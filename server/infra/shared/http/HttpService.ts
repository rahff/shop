import { AxiosInstance } from "axios";
import { IHttpService } from "../http/IHttpService";
import { FindOneResponse, FindResponse, StrapiMapper } from "strapi-adapter";



export class HttpService implements IHttpService {

    private mapper = new StrapiMapper();
    private baseUrl = process.env.API_URL
    
    constructor(private axios: AxiosInstance){}

    async find<TResponse>(url: string): Promise<FindResponse<TResponse> | null> {
        try {
            const response = await this.axios.get(this.baseUrl+url); 
            return this.mapper.mapResponse(response.data);
        } catch (error: any) {
            console.log(error.message);
            
            return null;
        }
    }
    async findOne<TResponse>(url: string): Promise<FindOneResponse<TResponse> | null> {
        try {
            const response = await this.axios.get(this.baseUrl+url);
            return this.mapper.mapFindOneResponse<TResponse>(response.data);
        } catch (error) {
            return null;
        }
    }

    async put<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>> {
        try {
            const response = await this.axios.put(this.baseUrl+url, data);
            return this.mapper.mapFindOneResponse<TResponse>(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async post<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>> {
        try {
            const response = await this.axios.post(this.baseUrl+url, data);
            return this.mapper.mapFindOneResponse<TResponse>(response.data)
        } catch (error) {
            throw error;
        }
    }
}