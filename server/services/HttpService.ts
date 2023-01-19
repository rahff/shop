import { IHttpService } from "../core/interfaces/IHttpService";
import { AxiosInstance } from "axios";



export class HttpService implements IHttpService {

    constructor(private axios: AxiosInstance, private baseApiUrl: string){}

    async get<TResponse>(url: string): Promise<TResponse> {
        const response = await this.axios.get(this.baseApiUrl + url, {headers: {"Authorization": "Bearer " + "03a2d62f4a2696925757abf3844372cfd8c3a8ef362c47ac7f01635888700c62245c443d16332c88e61a841ea9ddb25f5faeb932ef4527c75d3d1e7ab0270a6e1b19192a4e4c1ebd00215f4b807affcbf861223a40a0d723f2c821787322a76d9e06f55ff2edc73ac0215cafd167fd5458ac55074b90760bb8a6f9fb59b23f8d"}});
        return response.data;
    }

}