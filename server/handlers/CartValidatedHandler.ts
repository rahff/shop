import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { serviceLocator } from "../services/ServiceLocator"




export const cartValidatedHandler = async (event: CartValidatedEvent) => {
    try {
        const useCase = serviceLocator.InvoiceManager();
        await useCase.createInvoice(event.getData());
    } catch (error: any) {
        console.log("cartValidatedHandler", error.message);
    }
}