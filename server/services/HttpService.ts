import { AxiosInstance, RawAxiosRequestConfig } from "axios";



export class HttpService {

    private apiToken: string = process.env.API_TOKEN || "";
    private defaultConfig = { headers: {"Authorization": `Bearer ${this.apiToken}`}}
    
    constructor(private axios: AxiosInstance, private baseApiUrl: string){}

    async get<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<TResponse> {
        const requsetConfig = config ? config : this.defaultConfig;
        const response = await this.axios.get(this.baseApiUrl + url, requsetConfig);
        return response.data;
    }

    async put<TResponse, TData>(url: string, data: TData): Promise<TResponse> {
        try {
            const response = await this.axios.put(this.baseApiUrl + url, {data}, this.defaultConfig);
            return response.data;
        } catch (error: any) {
            throw error
        }
    }

    async post<TResponse, TData>(url: string, data: TData): Promise<TResponse> {
        const response = await this.axios.post(this.baseApiUrl + url, {data}, this.defaultConfig);
        return response.data;
    }

    async postPluginApi<TResponse, TData>(url: string, data: TData): Promise<TResponse> {
        const response = await this.axios.post(this.baseApiUrl + url, data);        
        return response.data;
    }
}