import axios, { AxiosInstance } from "axios";


describe("User connexion use-cases", ()=> {
    const serverUrl = "http://localhost:3000/api";
    const loginPath = "/auth/local";
    const registerPath = "/auth/local/register";
    let http: AxiosInstance;
    const generateRandomEmail = ()=> Math.random().toFixed(6) + "tester" + Math.random().toString() + "@gmail.com"

    beforeEach(()=>{
        http = axios.create();
    })

    it('new user registers himself as customer via register form', async ()=> {
        const body = {name: "tester3", firstname: "test3", email: generateRandomEmail(), password: "strapiPassword", title: "Mr", birthday: new Date(1988, 10, 22).toISOString(), subscribeNews: false};
        const response = await http.post(serverUrl+registerPath, body);
        expect(response.status).toBe(201);
        expect(response.data.user).toBeDefined();
        expect(response.data.jwt).toBeDefined();
    });

    it('customer login via login form', async ()=> {
        const body = {identifier: "strapie2e@gmail.com", password: "strapiPassword"};
        const response = await http.post(serverUrl+loginPath, body);
        expect(response.status).toBe(200);
        expect(response.data.user).toBeDefined();
        expect(response.data.jwt).toBeDefined();
    })

    // it('should verify token validity', async ()=> {
    //     const body = {identifier: "strapie2e@gmail.com", password: "strapiPassword"};
    //     const response = await http.post(serverUrl+loginPath, body);
    //     const token = response.data.jwt;
    //     const username = response.data.user.username;
    //     expect(username).toBe("strapie2e@gmail.com");
    //     const service = serviceLocator.AccountService();
    //     const isAuthenticated = await service.getUserIdIfAuthenticated(token);
    //     expect(isAuthenticated).toBeTruthy();
        
    // })

})