import EventEmitter from "events";
import { CartEvent } from "../../../core/events/CartEvent";
import { CartValidatedEvent } from "../../../core/events/CartValidatedEvent";
import { CartEventHandler } from "../../../core/handlers/CartEventHandler";
import { IEventBus } from "../../../shared/IEventBus";

export class CartEventBus extends EventEmitter implements IEventBus {

    constructor(private cartEventHandler: CartEventHandler){
        super();
        this.addListener(CartValidatedEvent.name, this.cartEventHandler.onCartValidated.bind(this.cartEventHandler));    
    }
    
    dispatch(event: CartEvent): void {
        this.emit(event.getName(), event);
    }

}