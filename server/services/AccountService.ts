import { IAccountService } from "../core/interfaces/IAccountService";
import { HttpService } from "./HttpService";



export class AccountService implements IAccountService {

    constructor(private http: HttpService){}
    
    async isCustomerAuthenticated(token: string): Promise<number> {
        return token === "anonymous" ? 0 : 1;
    }
}