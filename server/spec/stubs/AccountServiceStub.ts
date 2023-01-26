import { IAccountService } from "../../core/interfaces/IAccountService";


export class AccountServiceStub implements IAccountService {

    async isCustomerAuthenticated(token: string): Promise<number> {
        if(token === "usertokenjwt") {
            return 10
        }
        return 0;
    }

}