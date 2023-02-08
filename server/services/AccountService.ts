import { IAccountService } from "../core/interfaces/IAccountService";
import { BaseStrapiUser, StrapiUser } from "../interfaces/BaseStrapiUser";
import { IHttpService } from "../interfaces/IHttpService";
import { UserCredential } from "../interfaces/UserCredential";




export class AccountService implements IAccountService {

    private registerBaseUrl = "/api/auth/local/register";
    private loginBaseUrl = "/api/auth/local";
    private authenticationBaseUrl = "/api/users/me";

    constructor(private http: IHttpService){}
    
    async getUserIdIfAuthenticated(token: string): Promise<number> {
        return await this.authenticate(token);
    }

    async registerUser(body: BaseStrapiUser): Promise<{user: any, jwt: any}> {
        const response = await this.http.post<{user: any, jwt: any}, BaseStrapiUser>(this.registerBaseUrl, body);
        return response;
    }

    async loginUser(body: UserCredential): Promise<{user: any, jwt: any}> {
        const response = await this.http.post<{user: any, jwt: any}, UserCredential>(this.loginBaseUrl, body);
        return response;
    }

    private async authenticate(token: string): Promise<number> {
        const config = { headers: {"Authorization": `Bearer ${token}`}}
        const response = await this.http.get<StrapiUser>(this.authenticationBaseUrl, config);
        if(response) return response.id;
        return 0;
    }
}