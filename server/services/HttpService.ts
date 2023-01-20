import { IHttpService } from "../core/interfaces/IHttpService";
import { AxiosInstance } from "axios";



export class HttpService implements IHttpService {

    private apiToken: string = process.env.API_TOKEN || "";
    constructor(private axios: AxiosInstance, private baseApiUrl: string){}

    async getMany<TResponse>(url: string): Promise<TResponse> {
        const response = await this.axios.get(this.baseApiUrl + url, {headers: {"Authorization": `Bearer ${this.apiToken}`}});
        return response.data;
    }

}