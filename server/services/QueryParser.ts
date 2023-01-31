import { AddProductToCartCommand } from "../core/command/AddProductToCartCommand";
import { RemoveCartItemCommand } from "../core/command/RemoveCartItemCommand";
import { ValidateCartCommand } from "../core/command/ValidateCartCommand";
import { BaseStrapiUser } from "../interfaces/BaseStrapiUser";
import { RegistrationUserBody } from "../interfaces/RegistrationUserBody";



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
            console.log("cmd ");
            
            throw new Error("bad Request");
        }
    }

    public static toUserRegistrationCommand(requestBody: RegistrationUserBody): BaseStrapiUser {
        try {
            return  {
                firstname: requestBody.firstname,
                name: requestBody.name,
                username: requestBody.email,
                email: requestBody.email,
                birthday: requestBody.birthday,
                password: requestBody.password,
                title: requestBody.title
            }
        } catch (error) {
            throw new Error("bad Request");
        }
    }
}