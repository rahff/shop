import axios, { AxiosInstance } from "axios"

describe("Cart Use-cases", ()=>{
    const serverUrl = "http://localhost:3000/api";
    const loginPath = "/auth/local";
    let http: AxiosInstance;
    const addCartItem = async (config?: any) => await (await http.get(serverUrl+`/cart/add?productId=2`, config)).data;

    beforeEach(()=>{
        http = axios.create();
    })

    it("unauthenticated customer add a product to his cart", async ()=> {
        const response = await http.get(serverUrl+`/cart/add?productId=2`);
        expect(response.status).toBe(201);
    });
    
    it("authenticated customer add a product to his cart", async ()=> {
        const body = {identifier: "strapie2e@gmail.com", password: "strapiPassword"};
        const loginResponse = await http.post(serverUrl+loginPath, body);
        const token = loginResponse.data.jwt;
        const response = await http.get(serverUrl+`/cart/add?cartId=201&productId=1`, { headers: {"Authorization": `Bearer ${token}`}});
        expect(response.status).toBe(201);
    });
    
    it("customer who have a cart can retrieve it", async ()=>{
        const response = await http.get(serverUrl+`/cart/get/196`);
        expect(response.status).toBe(200);
    });

    it("customer who have a cart can decrement an item on it", async ()=>{
        await http.get(serverUrl+`/cart/add?cartId=196&productId=2`);
        const response = await http.get(serverUrl+`/cart/decrement-item?cartId=196&productId=2`);
        expect(response.status).toBe(201);
    });

    it("customer who have a cart can remove an item on it", async ()=>{
        const response = await http.get(serverUrl+`/cart/remove-item?cartId=196&productId=2`);
        expect(response.status).toBe(201);
    });

    it("unauthenticate customer cannot validate his cart", async ()=>{
        try {
            await http.get(serverUrl+`/cart/validate?cartId=134`);
        } catch (error: any) {
            expect(error.message).toBe("Request failed with status code 403");
        }
    });

    it("customer add item on cart as unauthenticate, then he logged in and validate his cart", async ()=>{
        const data = await addCartItem();
        const body = {identifier: "tester2test@gmail.com", password: "strapiPassword"};
        const loginResponse = await http.post(serverUrl+loginPath, body);
        const token = loginResponse.data.jwt;
        const response = await http.get(serverUrl+`/cart/validate?cartId=${data.cart.id}`, { headers: {"Authorization": `Bearer ${token}`}});
        expect(response.status).toBe(200);
    });

    it("customer logged in, then he add an item on his cart then validate it", async ()=>{
        const body = {identifier: "strapie2e@gmail.com", password: "strapiPassword"};
        const loginResponse = await http.post(serverUrl+loginPath, body);
        const token = loginResponse.data.jwt;
        const data = await addCartItem({headers: {"Authorization": `Bearer ${token}`}});
        const response = await http.get(serverUrl+`/cart/validate?cartId=${data.cart.id}`, { headers: {"Authorization": `Bearer ${token}`}});
        expect(response.status).toBe(200);
    });
})