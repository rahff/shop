import { IAccountService } from "../../../core/interfaces/IAccountService";
import { BaseStrapiUser, StrapiUser } from "../interfaces/BaseStrapiUser";
import { IAuthHttpService } from "../../shared/http/IAuthHttp";




export class AccountService implements IAccountService {

    private registerBaseUrl = "/api/auth/local/register";
    private authenticationBaseUrl = "/api/users/me";

    constructor(private http: IAuthHttpService){}
    
    async getUserIdIfAuthenticated(token: string): Promise<number> {
        return await this.authenticate(token);
    }

    async registerUser(body: BaseStrapiUser): Promise<{user: any, jwt: any}> {
        const response = await this.http.send<BaseStrapiUser, {user: any, jwt: any}>(this.registerBaseUrl, body);
        return response;
    }

    private async authenticate(token: string): Promise<number> {
        const config = { headers: {"Authorization": `Bearer ${token}`}}
        const response = await this.http.verifyToken<StrapiUser>(this.authenticationBaseUrl, config);
        if(response) return response.id;
        return 0;
    }
}