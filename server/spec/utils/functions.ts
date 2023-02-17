import { ProductDto } from "../../core/dto/ProductDto";

export const isCartDto = (data: any): boolean => {
    try {
        const dto = {
            amount: Number(data.amount),
            cartItems: Array.isArray(data.cartItems),
            customerId: Number(data.customerId),
            id: Number(data.id),
            validated: isBoolean(data.validated)
        }
        return true;
    } catch (error) {
        return false;
    }
}

export const isProductDto = (data: any): boolean => {
    try {
        const dto: any = {
            id: Number(data.id),
            images: isString(data.images),
            name: isString(data.name),
            packaging: data.packaging,
            price: Number(data.price)
        }
        return true;
    } catch (error) {
        return false;
    }
}

function isBoolean(value: any): boolean {
    try {
        const isBoolean = value === true || value === false;
        if(!isBoolean) throw new Error("boolean expected");
        return true
    } catch (error) {
        throw error;
    }
}

function isString(value: any): boolean {
    try {
        const isString = typeof value === "string";
        if(!isString) throw new Error("string expected");
        return true
    } catch (error) {
        throw error;
    }
}