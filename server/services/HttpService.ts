import { AxiosInstance } from "axios";



export class HttpService {

    private apiToken: string = process.env.API_TOKEN || "";
    private defaultConfig = { headers: {"Authorization": `Bearer ${this.apiToken}`}}
    
    constructor(private axios: AxiosInstance, private baseApiUrl: string){}

    async get<TResponse>(url: string): Promise<TResponse> {
        const response = await this.axios.get(this.baseApiUrl + url, this.defaultConfig);
        return response.data;
    }

    async put<TResponse, TData>(url: string, data: TData): Promise<TResponse> {
        const response = await this.axios.put(this.baseApiUrl + url, {data}, this.defaultConfig);
        return response.data;
    }

    async post<TResponse, TData>(url: string, data: TData): Promise<TResponse> {
        const response = await this.axios.post(this.baseApiUrl + url, {data}, this.defaultConfig);
        return response.data;
    }
}