import { AddProductToCartCommand } from "../core/command/AddProductToCartCommand";
import { RemoveCartItemCommand } from "../core/command/RemoveCartItemCommand";

export class QueryParser {
    public static toAddProductCartCommand(input: any): AddProductToCartCommand {
        try {
            return {
                cartId: Number(input["cartId"]), 
                productId: Number(input["productId"]), 
                token: input["token"] as string
              } 
            
        } catch (error) {
            throw new Error("bad Request");
        }
    }

    public static toRemoveItemCartCommand(input: any): RemoveCartItemCommand {
        try {
            return {
                cartId: Number(input["cartId"]), 
                productId: Number(input["productId"])
              } 
            
        } catch (error) {
            throw new Error("bad Request");
        }
    }

    public static toDecrementItemCartCommand(input: any): RemoveCartItemCommand {
        try {
            return {
                cartId: Number(input["cartId"]), 
                productId: Number(input["productId"])
              } 
            
        } catch (error) {
            throw new Error("bad Request");
        }
    }
}