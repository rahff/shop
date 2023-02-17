import { AddProductToCartCommand } from "../../core/command/AddProductToCartCommand";
import { ValidateCartCommand } from "../../core/command/ValidateCartCommand";
import { RemoveCartItemCommand } from "../../core/command/RemoveCartItemCommand";
import { DecrementQuantityItemCommand } from "../../core/command/DecrementQuantityItemCommand";
import { CartFactory } from "../../core/model/factories/CartFactory";
import { CartDto } from "../../core/dto/CartDto";
import { ICartManager } from "../../shared/ICartManger";
import { CartManager } from "../../core/use-cases/CartManager";
import { CartServiceStub } from "../../infra/shared/stubs/command/CartServiceStub";
import { ProductServiceStub } from "../../infra/shared/stubs/command/ProductSerciveStub";
import { AccountServiceStub } from "../../infra/shared/stubs/command/AccountServiceStub";
import { EventBusStub } from "../../infra/shared/stubs/command/EventBusStub";
import { CartValidatedEvent } from "../../core/events/CartValidatedEvent";



describe("CartManager", ()=> {

    let sut: ICartManager;
    
    beforeEach(()=> {
        sut = new CartManager(new CartServiceStub(), new ProductServiceStub(), new AccountServiceStub())
    }) 

    it("should create a new cart with the corresponding item if the user have not one yet", async ()=> {
        const command: AddProductToCartCommand = {cartId: 0, productId: 1, token: "anonymous"}
        const cart = await sut.addCartItem(command);
        expect(cart.id).toEqual(147);
        expect(cart.items[0].product_id).toEqual(1);
    });
    
    it("should add item on an existing cart", async ()=> {
        const cart = await addItemInCart();
        expect(cart.id).toEqual(7);
        expect(cart.items[0].product_id).toEqual(1);
    });

    it("should incremente item quantity and amount if the same product is added in the same cart", async ()=>{
        await addItemInCart(2);
        const cart = await addItemInCart(2);
        expect(cart.id).toEqual(7);
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.items[0].amount).toEqual(39.98);
    });

    it("cannot add cart item nor incremente it when cart is validated", async ()=> {
        await addItemInCart(1, "usertokenjwt");
        const command: ValidateCartCommand = {cartId: 7, token: "usertokenjwt"};
        const cartValidatedEvent = await sut.validateCart(command);
        const cart = await addItemInCart(2, "usertokenjwt");
        expect(cartValidatedEvent).toBeTruthy();
        expect(cart.validated).toBeTrue();
        expect(cart.items.length).toEqual(1);
    })

    it("unauthenticated user cannot validate cart", async ()=>{
        await addItemInCart(1);
        const command: ValidateCartCommand = { cartId: 7, token: "nullOrInvalidToken" };
        sut.validateCart(command).then(()=> {
            expect(1).toBeFalsy();        
        }).catch((error: any)=>{
            expect(error.message).toBe("unauthenticated customer");
        });

    });

    it("authenticated user can validate cart only once", async ()=>{
        const cartDto = await addItemInCart(1);
        const command: ValidateCartCommand = {cartId: 7, token: "usertokenjwt"};
        sut.validateCart(command)
        .then((event: CartValidatedEvent)=> {
            expect(event.getData().validated).toBeTrue()
        });
        sut.validateCart(command)
        .catch((error: any) => {
            expect(error.message).toBe("404 not found")
        });      
    });

    it("should create a new cart for a particular user ", async ()=> {
        const command: AddProductToCartCommand = {cartId: 0, productId: 1, token: "usertokenjwt"}
        const cart = await sut.addCartItem(command);
        expect(cart.id).toEqual(147);
        expect(cart.items[0].product_id).toEqual(1);
        expect(cart.customerId).toEqual(10);
    });

    it("should remove an item on a cart", async ()=>{
        const command: RemoveCartItemCommand = { cartId: 7, productId: 1};
        await addItemInCart(1);
        const updatedCart = await sut.removeCartItem(command);
        expect(updatedCart.items).toEqual([]);
        expect(updatedCart.id).toEqual(7);
    })

    it("cannot remove item on a non existing cart", async ()=>{
        const command: RemoveCartItemCommand = { cartId: 0, productId: 1};
        try {
            await sut.removeCartItem(command);
        } catch (error: any) {
            expect(error.message).toEqual("404 not found");
        }
    })

    it("should decremente a item quantity only when quantity is grather than 1", async ()=>{
        const command: DecrementQuantityItemCommand = { cartId: 7, productId: 1};
        await addItemInCart(1);
        const updatedCart = await sut.decrementCartItem(command);
        expect(updatedCart.items[0].quantity).toBe(1);
        await addItemInCart(1);
        await sut.decrementCartItem(command);
        expect(updatedCart.items[0].quantity).toBe(1);
    })

    const addItemInCart = async (productId: number=1, token: string=""): Promise<CartDto> => {
        const command: AddProductToCartCommand = {cartId: 7, productId, token}
        const cart = await sut.addCartItem(command);
        return CartFactory.from(cart).asDto();
    }
})