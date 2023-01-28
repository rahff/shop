import { AddProductToCartCommand } from "../core/command/AddProductToCartCommand";
import { RemoveCartItemCommand } from "../core/command/RemoveCartItemCommand";
import { ValidateCartCommand } from "../core/command/ValidateCartCommand";

export class QueryParser {
    public static toAddProductCartCommand(queryParam: any, headers: any): AddProductToCartCommand {
        try {
            if(!headers.authorization){
                headers.authorization = "user: anonymous";
            }
            return {
                cartId: Number(queryParam["cartId"] || "0"), 
                productId: Number(queryParam["productId"]), 
                token: headers.authorization.split(' ')[1]
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

    public static toValidateCartCommand(queryParam: any, headers: any): ValidateCartCommand {
        try {
            if(!headers.authorization) headers.authorization = "anonymous";
            return {
                cartId: Number(queryParam["cartId"]),
                token: headers.authorization.split(" ")[1]
            }
        } catch (error) {
            throw new Error("bad Request");
        }
    }
}