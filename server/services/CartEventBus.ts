import EventEmitter from "events";
import { CartEvent } from "../events/CartEvent";
import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { cartValidatedHandler } from "../handlers/CartValidatedHandler";
import { IEventBus } from "../interfaces/IEventBus";

export class CartEventBus extends EventEmitter implements IEventBus {

    constructor(){
        super();
        this.addListener(CartValidatedEvent.name, cartValidatedHandler)
    }

    dispatch(event: CartEvent): void {
        this.emit(event.getName(), event);
    }

}