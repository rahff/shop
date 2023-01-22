import { IAccountService } from "../../core/model/interfaces/IAccountService";

export class AccountServiceStub implements IAccountService {

    async isCustomerAuthenticated(token: string): Promise<number> {
        if(token === "usertokenjwt") {
            return 10
        }
        return 0;
    }

}