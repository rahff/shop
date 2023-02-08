import { CartManager } from "../../core/use-cases/CartManager";
import { CartService } from "../../services/CartService";
import { EntityMapper } from "../../services/EntityMapper";
import { QueryParser } from "../../services/QueryParser";
import { serviceLocator } from "../../services/ServiceLocator";
import { FakeRequest } from "../stubs/ExpressTypeStub";


describe("CartController", ()=> {

    let cartManager: CartManager;
    let cartService: CartService;

    beforeEach(()=> {
        cartManager = serviceLocator.CartManager();
        cartService = serviceLocator.CartService();;
    });

    it("addCartItemController", async () => {
        
        const command = { cartId: 1, productId: 1, token: "" };
        const cart = await cartManager.addCartItem(command);
        const responseData = EntityMapper.cartToJsonOut(cart);    
        expect(responseData).toBeTruthy();
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

    it('getCartController', async ()=>{
        const cart = await cartService.getCartOrNothing(1);
        expect(cart).toBeTruthy();
    });

    it('getCartViewController', async ()=>{
        const cart = await cartService.getCartOrNothing(1);
        const cartViewModel = EntityMapper.cartToJsonOut(cart!);
        expect(cartViewModel).toBeTruthy();
    })

    it('validateCartController', async ()=>{
        const command = { cartId: 1, token: "" };
        const service = serviceLocator.CartManager();
        const isValidated = await service.validateCart(command);
        expect(isValidated).toBeTrue()
    })
})