import { IAccountService } from "../../../../core/interfaces/IAccountService";
import { BaseStrapiUser } from "../../../command/interfaces/BaseStrapiUser";



export class AccountServiceStub implements IAccountService {

    registerUser(body: BaseStrapiUser): Promise<{ user: any; jwt: any; }> {
        throw new Error("Method not implemented.");
    }

    async getUserIdIfAuthenticated(token: string): Promise<number> {
        if(token === "usertokenjwt") {
            return 10
        }
        return 0;
    }

}