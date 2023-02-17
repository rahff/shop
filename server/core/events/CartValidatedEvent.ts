import { ValidatedCartDto } from "../dto/CartDto";
import { CartEvent } from "./CartEvent";



export class CartValidatedEvent extends CartEvent {

    constructor(private data: ValidatedCartDto){
        super(CartValidatedEvent.name);
    }

    getData(): ValidatedCartDto {
        return this.data;
    }
}