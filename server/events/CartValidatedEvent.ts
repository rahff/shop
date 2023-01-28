import { JsonCartOut } from "../interfaces/JsonCart";
import { CartEvent } from "./CartEvent";

export class CartValidatedEvent extends CartEvent {

    constructor(private data: {customerId: number, cartId: number}){
        super(CartValidatedEvent.name);
    }

    getData(): {customerId: number, cartId: number} {
        return this.data;
    }
}