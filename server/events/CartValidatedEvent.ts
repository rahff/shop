import { CartEvent } from "./CartEvent";

export class CartValidatedEvent<T> extends CartEvent {

    constructor(private data: T){
        super(CartValidatedEvent.name);
    }

    getData(): T {
        return this.data;
    }
}