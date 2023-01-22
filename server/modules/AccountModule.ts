import { AccountService } from "../services/AccountService";
import { HttpModule } from "./HttpModule";

export class AccountModule {
    private static accountService = new AccountService(HttpModule.HttpService());


    public static AccountSevice(): AccountService {
        return AccountModule.accountService;
    }
}