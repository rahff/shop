import { IAccountService } from "../../core/interfaces/IAccountService";


export class AccountServiceStub implements IAccountService {

    async getUserIdIfAuthenticated(token: string): Promise<number> {
        if(token === "usertokenjwt") {
            return 10
        }
        return 0;
    }

}