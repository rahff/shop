import { AccountService } from "../../infra/command/services/AccountService"
import { ServiceLocator } from "../../infra/command/services/ServiceLocator";
import { IQueryAccount } from "../../infra/query/interfaces/IQueryAccount";
import { QueryLocator } from "../../infra/query/services/QueryLocator";



describe("UserConnexionController", ()=> {

    const queryLocator = new QueryLocator(true);
    const serviceLocator = new ServiceLocator(true);
    
    describe("Command", ()=>{

        let accountService: AccountService;
    
        beforeEach(()=>{
            accountService = serviceLocator.AccountService();
        })
    
        
        it('LoginController', async ()=> {
            const response = await accountService.registerUser({
                username: "tester@gamil.com",
                firstname: "tesret",
                name: "tester",
                email: "tester@gamil.com",
                birthday: "1992-10-12",
                title: "Mr",
                password: "strapiPassword"
            });
            expect(response.user).toBeTruthy();
            expect(response.jwt).toBeTruthy();
        })
    })

    describe("Query", ()=>{
        let accountQuery: IQueryAccount;
        beforeEach(()=> {
            accountQuery = queryLocator.AccountQuery()
        })
        it('LoginController', async ()=> {
            const response = await accountQuery.loginUser({identifier: "test@gmail.com", password: "123123"});
            expect(response).toBeTruthy();
        })
    
    })
})