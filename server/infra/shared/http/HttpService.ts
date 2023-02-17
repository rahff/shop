import { AxiosInstance, RawAxiosRequestConfig } from "axios";
import { IHttpService } from "../http/IHttpService";
import { FindOneResponse, FindResponse, StrapiMapper } from "strapi-adapter";



export class HttpService implements IHttpService {

    private apiToken: string = process.env.API_TOKEN || "";
    private defaultConfig = { headers: {"Authorization": `Bearer ${this.apiToken}`}}
    private mapper = new StrapiMapper()
    
    constructor(private axios: AxiosInstance, private baseApiUrl: string){}

    async find<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<FindResponse<TResponse> | null> {
        try {
            const requsetConfig = config ? config : this.defaultConfig;
            const response = await this.axios.get(this.baseApiUrl + url, requsetConfig);
            return this.mapper.mapResponse(response.data);
        } catch (error) {
            return null;
        }
    }
    async findOne<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<FindOneResponse<TResponse> | null> {
        try {
            const requsetConfig = config ? config : this.defaultConfig;
            const response = await this.axios.get(this.baseApiUrl + url, requsetConfig);
            return this.mapper.mapFindOneResponse<TResponse>(response.data);
        } catch (error) {
            return null;
        }
    }

    async put<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>> {
        try {
            const response = await this.axios.put(this.baseApiUrl + url, data, this.defaultConfig);
            return this.mapper.mapFindOneResponse<TResponse>(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async post<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>> {
        try {
            const response = await this.axios.post(this.baseApiUrl + url, data, this.defaultConfig);
            return this.mapper.mapFindOneResponse<TResponse>(response.data)
        } catch (error) {
            throw error;
        }
    }
}