import { CartValidatedEvent } from "../events/CartValidatedEvent";
import { ShopModule } from "../modules/ShopModule";




export const cartValidatedHandler = async (event: CartValidatedEvent) => {
    const useCase = ShopModule.InvoiceManager();
    try {
        await useCase.createInvoice(event.getData());
    } catch (error) {
        console.log(error);
    }
}