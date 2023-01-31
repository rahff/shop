import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { ShopModule } from "../modules/ShopModule";




export const cartValidatedHandler = async (event: CartValidatedEvent) => {
    try {
        const useCase = ShopModule.InvoiceManager();
        await useCase.createInvoice(event.getData());
    } catch (error: any) {
        console.log("cartValidatedHandler", error.message);
    }
}