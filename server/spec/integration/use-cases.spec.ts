import axios, { AxiosInstance } from "axios"

describe("Integration Tests", ()=>{
    const serverUrl = "http://localhost:3000/api";
    const apiUrl = "http://localhost:1337/api";
    let http: AxiosInstance;
    const addCartItem = async () => await (await http.get(serverUrl+`/cart/add?productId=2`)).data;

    beforeEach(()=>{
        http = axios.create();
    })

    it("unauthenticated customer add a product to his cart", async ()=> {
        const response = await http.get(serverUrl+`/cart/add?productId=2`);
        expect(response.status).toBe(201);
    });
    
    it("authenticated customer add a product to his cart", async ()=> {
        const response = await http.get(serverUrl+`/cart/add?cartId=32&productId=1`, { headers: {"Authorization": `Bearer 123token`}});
        expect(response.status).toBe(201);
    });
    
    it("customer who have a cart can retrieve it", async ()=>{
        const response = await http.get(serverUrl+`/cart/get/5`);
        expect(response.status).toBe(200);
    });

    it("customer who have a cart can decrement an item on it", async ()=>{
        const response = await http.get(serverUrl+`/cart/decrement-item?cartId=32&productId=2`);
        expect(response.status).toBe(201);
    });

    it("customer who have a cart can remove an item on it", async ()=>{
        const response = await http.get(serverUrl+`/cart/remove-item?cartId=32&productId=2`);
        expect(response.status).toBe(201);
    });

    it("unauthenticate customercannot validate his cart", async ()=>{
        try {
            await http.get(serverUrl+`/cart/validate?cartId=32`);
        } catch (error: any) {
            expect(error.message).toBe("Request failed with status code 403");
        }
    });

    it("authenticate customercan validate his cart", async ()=>{
        const data = await addCartItem();    
        const response = await http.get(serverUrl+`/cart/validate?cartId=${data.cart.id}`, { headers: {"Authorization": `Bearer 123token`}});
        expect(response.status).toBe(200);
    });
})