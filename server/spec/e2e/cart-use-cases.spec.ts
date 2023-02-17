import axios, { AxiosInstance, AxiosResponse } from "axios"
import { E2ETest } from "./utils/functions";


describe("Cart Use-cases", ()=> {

    let tester: E2ETest;
   

    beforeEach(()=> {
        tester = new E2ETest(axios.create())
    })

    describe("Scenario: ", ()=>{
        
        it("new customer want a product, it found it and add it on cart, then it remove it and leaves", async ()=> {
            const addOnCartResponse = await tester.addCartItem(2, 0);
            const cartId = addOnCartResponse.data.cart.id;
            expect(addOnCartResponse.status).toBe(201);
            const removeItemResonse = await tester.removeItemOnCart(cartId, 2);
            expect(removeItemResonse.status).toBe(201);

            //verify state of cart directly on strapi
        });
    })

    describe("Scenario: ", ()=>{
        it("customer want a product, it found it and add it on cart, then validate it", async ()=> {
            const {token} = await tester.getUserToken("strapie2e@gmail.com");
            const addOnCartResponse = await tester.addCartItem(1,0, tester.headers(token));
            const cartId = addOnCartResponse.data.cart.id;
            expect(addOnCartResponse.status).toBe(201);
            const response = await tester.validateCart(cartId, token);
            expect(response.status).toBe(200);

            //verify state of cart directly on strapi
        });
    })

    describe("Scenario: ", ()=> {

        it("customer add a product twice to his cart then decrement the quantity", async ()=> {
            const addCartItemResponse = await tester.addCartItem(1, 0);
            const cartId = addCartItemResponse.data.cart.id;  
            const secondResponse = await tester.addCartItem(1, addCartItemResponse.data.cart.id);
            expect(addCartItemResponse.status).toBe(201);
            expect( secondResponse.status).toBe(201);
            const response = await tester.decrementItemOnCart(cartId, 1)
            expect(response.status).toBe(201);
        })
    })
    
    describe("Scenario: ", ()=> {

        it("customer add item on cart as unauthenticate, then he login and validate his cart", async ()=>{
            const addItemResponse = await tester.addCartItem(1, 0);
            const cartId = addItemResponse.data.cart.id
            const isCartValidatedBeforeAuthentication = await tester.canValidateCart(cartId, "notoken");
            
            expect(isCartValidatedBeforeAuthentication).toBeFalse();
            const { token } = await tester.getUserToken("tester2test@gmail.com");
            const response = await tester.canValidateCart(cartId, token);
            expect(response).toBeTrue();
        });

        it("customer logged in, then he add an item on his cart then validate it", async ()=>{
           const { user, token } = await tester.getUserToken("strapie2e@gmail.com");
            const addItemResponse = await tester.addCartItem(1, user.cartId || 0, tester.headers(token));
            const cartId = addItemResponse.data.cart.id;    
            const response = await tester.canValidateCart(cartId, token);
            expect(response).toBeTrue();
        });
    })
})