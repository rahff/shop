import { IAuthHttpService } from "../../shared/http/IAuthHttp";
import { IQueryAccount } from "../interfaces/IQueryAccount";
import { UserCredential } from "../interfaces/UserCredential";





export class QueryAccount implements IQueryAccount {

    private loginBaseUrl = "/api/auth/local";

    constructor(private http: IAuthHttpService){}

   
    async loginUser(body: UserCredential): Promise<{user: any, jwt: any}> {
        const response = await this.http.send<UserCredential, {user: any, jwt: any}>(this.loginBaseUrl, body);
        return response;
    }
}