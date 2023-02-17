import { AxiosInstance, RawAxiosRequestConfig } from "axios";
import { IAuthHttpService } from "./IAuthHttp";

export class HttpUserPlugin implements IAuthHttpService {

    constructor(private http: AxiosInstance, private baseApiUrl: string){}
    
    async verifyToken<T>(url: string, config: RawAxiosRequestConfig<any>): Promise<T | null> {
        try {
            const response = await this.http.get(this.baseApiUrl+url, config);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async send<T, R>(url: string, body: T): Promise<R> {
        const response = await this.http.post(this.baseApiUrl+url, body);
        return response.data;
    }

}