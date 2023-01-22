import { IAccountService } from "../core/model/interfaces/IAccountService";
import { HttpService } from "./HttpService";

export class AccountService implements IAccountService {

    constructor(private http: HttpService){}
    
    isCustomerAuthenticated(token: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
}