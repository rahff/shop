import axios, { AxiosInstance, AxiosResponse } from "axios"


describe("Cart Use-cases", ()=>{
    const serverUrl = "http://localhost:3000/api";
    const loginPath = "/auth/local";
    let http: AxiosInstance;
    const addToCartUrl = (productId: number, cartId?: number) => `/cart/add?productId=${productId}&cartId=${cartId?cartId:"0"}`;
    const credentials = (identifier: string) => ({identifier, password: "strapiPassword"});
    const addCartItem = async (productId: number, cartId: number, config?: any):Promise<AxiosResponse> =>{ 
        return await http.get(serverUrl+addToCartUrl(productId, cartId), config);
    }
    const canValidateCart = async (cartId: number, token: string): Promise<boolean> => {
        try {
            await http.get(serverUrl+`/cart/validate?cartId=${cartId}`, headers(token));
            return true;
        } catch (error: any) {
            return false;
        }
    }
    const getUserToken = async (identifier: string): Promise<{user: any, token: string}> => {
       const response = await http.post(serverUrl+loginPath, credentials(identifier));
       return {user: response.data.user, token: response.data.jwt}
    }
    const headers = (token: string)=> ({ headers: {"Authorization": `Bearer ${token}`}});
    const validateCart = async (cartId: number, token: string): Promise<AxiosResponse> => {
        return await http.get(serverUrl+`/cart/validate?cartId=${cartId}`, headers(token));
    }

    beforeEach(()=> {
        http = axios.create();
    })

    describe("Scenario: ", ()=>{
        
        it("new customer want a product, it found it and add it on cart, then it remove it and leaves", async ()=> {
            const addOnCartResponse = await addCartItem(2, 0);
            const cartId = addOnCartResponse.data.cart.id;
            expect(addOnCartResponse.status).toBe(201);
            const removeItemResonse = await http.get(serverUrl+`/cart/remove-item?cartId=${cartId}&productId=2`);
            expect(removeItemResonse.status).toBe(201);

            //verify state of cart directly on strapi
        });
    })

    describe("Scenario: ", ()=>{
        it("customer want a product, it found it and add it on cart, then validate it", async ()=> {
            const {token} = await getUserToken("strapie2e@gmail.com");
            const addOnCartResponse = await addCartItem(1,0, headers(token));
            const cartId = addOnCartResponse.data.cart.id;
            expect(addOnCartResponse.status).toBe(201);
            const response = await validateCart(cartId, token);
            expect(response.status).toBe(200);

            //verify state of cart directly on strapi
        });
    })

    describe("Scenario: ", async ()=> {

        it("customer add a product twice to his cart then decrement the quantity", async ()=> {
            const addCartItemResponse = await addCartItem(1, 0);
            const secondResponse = await addCartItem(1, addCartItemResponse.data.cart.id);
            expect(addCartItemResponse.status).toBe(201);
            expect( secondResponse.status).toBe(201);
            const response = await http.get(serverUrl+`/cart/decrement-item?cartId=196&productId=2`);
            expect(response.status).toBe(201);

            // verify state of cart directly on strapi 
        })
    })
    
    describe("Scenario: ", ()=> {

        it("customer add item on cart as unauthenticate, then he login and validate his cart", async ()=>{
            const addItemResponse = await addCartItem(1, 0);
            
            const cartId = addItemResponse.data.cart.id
            const isCartValidatedBeforeAuthentication = await canValidateCart(cartId, "notoken");
            expect(isCartValidatedBeforeAuthentication).toBeFalse();
            const { token } = await getUserToken("tester2test@gmail.com");
            const response = await canValidateCart(cartId, token);
            expect(response).toBeTrue();
        });

        it("customer logged in, then he add an item on his cart then validate it", async ()=>{
           const { user, token } = await getUserToken("strapie2e@gmail.com");
            const addItemResponse = await addCartItem(1, user.cartId || 0);
            const cartId = addItemResponse.data.cart.id
            const response = await canValidateCart(cartId, token);
            expect(response).toBeTrue();
        });
    })
   

})