import { AccountService } from "../../services/AccountService"
import { serviceLocator } from "../../services/ServiceLocator";

describe("UserConnexionController", ()=> {

    let accountService: AccountService;

    beforeEach(()=>{
        accountService = serviceLocator.AccountService();
    })

    it('LoginController', async ()=> {
        const response = await accountService.loginUser({identifier: "test@gmail.com", password: "123123"});
        expect(response).toBeTruthy();
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