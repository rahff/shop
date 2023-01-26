import { CartValidatedEvent } from "../events/CartValidatedEvent";



export const cartValidatedHandler = async (event: CartValidatedEvent<any>) => {
    console.log(event);
}