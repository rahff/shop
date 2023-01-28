import { CartManager } from "../../core/use-cases/CartManager";
import { AddProductToCartCommand } from "../../core/command/AddProductToCartCommand";
import { ValidateCartCommand } from "../../core/command/ValidateCartCommand";
import { CartItem } from "../../core/model/valueObjects/CartItem";
import { Cart } from "../../core/model/entities/Cart";
import { RemoveCartItemCommand } from "../../core/command/RemoveCartItemCommand";
import { DecrementQuantityItemCommand } from "../../core/command/DecrementQuantityItemCommand";
import { CartModuleTest } from "../stubs/CartModuleTest";



describe("CartManager", ()=> {

    let sut: CartManager;
    
    beforeEach(()=> {
        sut = new CartModuleTest().CartManger();
    }) 

    it("should create a new cart with the corresponding item if the user have not one yet", async ()=> {
        const command: AddProductToCartCommand = {cartId: 0, productId: 1, token: "anonymous"}
        const cart = await sut.addCartItem(command);
        expect(cart.getId()).toEqual(147);
        expect(cart.getItems()[0]).toBeInstanceOf(CartItem);
        expect(cart.getItems()[0].getProductId()).toEqual(1);
    });
    
    it("should add item on an existing cart", async ()=> {
        const cart = await addItemInCart();
        expect(cart.getId()).toEqual(7);
        expect(cart.getItems()[0]).toBeInstanceOf(CartItem);
        expect(cart.getItems()[0].getProductId()).toEqual(1);
    });

    it("should incremente item quantity and amount if the same product is added in the same cart", async ()=>{
        await addItemInCart(2);
        const cart = await addItemInCart(2);
        expect(cart.getId()).toEqual(7);
        expect(cart.getItems()[0].getQuantity()).toEqual(2);
        expect(cart.getItems()[0].getAmount()).toEqual(39.98);
    });

    it("cannot add cart item nor incremente it when cart is validated", async ()=> {
        await addItemInCart(1);
        const command: ValidateCartCommand = {cartId: 7, token: "usertokenjwt"};
        const isValidated = await sut.validateCart(command);
        const cart = await addItemInCart(2);
        expect(isValidated).toBeTrue();
        expect(cart.isValidated()).toBeTrue();
        expect(cart.getItems().length).toEqual(1);
    })

    it("unauthenticated user cannot validate cart", async ()=>{
        const cart = await addItemInCart(1);
        const command: ValidateCartCommand = { cartId: 7, token: "nullOrInvalidToken" };
        const isValidated = await sut.validateCart(command);
        expect(isValidated).toBeFalse();
        expect(cart.isValidated()).toBeFalse();
    });

    it("authenticated user can validate cart only once", async ()=>{
        const cart = await addItemInCart(1);
        const command: ValidateCartCommand = {cartId: 7, token: "usertokenjwt"};
        const isValidated = await sut.validateCart(command);
        expect(isValidated).toBeTrue();
        expect(cart.isValidated()).toBeTrue();
        const isValidated2 = await sut.validateCart(command);
        expect(isValidated2).toBeFalse();
      
    });

    it("should create a new cart for a particular user ", async ()=> {
        const command: AddProductToCartCommand = {cartId: 0, productId: 1, token: "usertokenjwt"}
        const cart = await sut.addCartItem(command);
        expect(cart.getId()).toEqual(147);
        expect(cart.getItems()[0]).toBeInstanceOf(CartItem);
        expect(cart.getItems()[0].getProductId()).toEqual(1);
        expect(cart.getCustomerId()).toEqual(10);
    });

    it("should remove an item on a cart", async ()=>{
        const command: RemoveCartItemCommand = { cartId: 7, productId: 1};
        await addItemInCart(1);
        const updatedCart = await sut.removeCartItem(command);
        expect(updatedCart.getItems()).toEqual([]);
        expect(updatedCart.getId()).toEqual(7);
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
        expect(updatedCart.getItems()[0].getQuantity()).toBe(1);
        await addItemInCart(1);
        await sut.decrementCartItem(command);
        expect(updatedCart.getItems()[0].getQuantity()).toBe(1);
    })

    const addItemInCart = async (productId: number=1, token: string=""): Promise<Cart> => {
        const command: AddProductToCartCommand = {cartId: 7, productId, token}
        const cart = await sut.addCartItem(command);
        return cart;
    }
})