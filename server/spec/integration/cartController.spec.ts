import { CartController } from "../../infra/command/controller/CartController";
import { ServiceLocator } from "../../infra/command/services/ServiceLocator";
import { QueryCartController } from "../../infra/query/controllers/CartController";
import { QueryLocator } from "../../infra/query/services/QueryLocator";
import { IQueryCart } from "../../infra/query/interfaces/IQueryCart";
import { ICartManager } from "../../shared/ICartManger";
import { CartValidatedEvent } from "../../core/events/CartValidatedEvent";




describe("CartController", ()=> {
    const serviceLocator = new ServiceLocator(true);
    const queryLocator = new QueryLocator(true);

    describe('Command', ()=> {

        let cartManager: ICartManager;
    
        beforeEach(()=> {
            cartManager = serviceLocator.CartManager();
        });

        it("addCartItemController", async () => {
            const command = { cartId: 1, productId: 1, token: "" };
            const cart = await cartManager.addCartItem(command);
            expect(cart).toBeTruthy();
        });
    
        it('removeCartItemController', async ()=> {
            const command = { cartId: 1, productId: 1, token: "" };
            const cart = await cartManager.removeCartItem(command);
            expect(cart).toBeTruthy();
        });
    
        it('decrementCartItemController', async ()=>{
            const command = { cartId: 1, productId: 1 };
            const cart = await cartManager.decrementCartItem(command);
            expect(cart).toBeTruthy()
        });

        it('validateCartController', async ()=>{
            const command = { cartId: 1, token: "" };
            const service = serviceLocator.CartManager();
            const event = await service.validateCart(command);
            expect(event).toEqual(new CartValidatedEvent({ amount: 19.99, items: [ Object({ image_url: 'fake_url', product_id: 1, product_name: 'fake_name', product_price: 19.99, quantity: 1, amount: 19.99 }) ], customerId: 40, id: 2, validated: true }))
        })
    })

    describe("Query", ()=>{
        let cartQuery: IQueryCart;

        beforeEach(()=> {
            cartQuery = queryLocator.CartQuery();
        })
        it('getCartController', async ()=>{
            const cart = await cartQuery.getCartById(1);
            expect(cart).toBeTruthy();
        });
        
        // it('getCartViewController', async ()=>{
        //     const cart = await cartQuery.getCartOrNothing(1);
        //     // const cartViewModel = EntityMapper.cartToJsonOut(cart!);
        //     expect(cart).toBeTruthy();
        // })
    })

    })