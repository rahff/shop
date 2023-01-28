import { CartModule } from "./CartModule";
import { InvoiceManager } from "../core/use-cases/InvoiceManager";
import { InvoiceService } from "../services/InvoiceService";
import { HttpModule } from "./HttpModule";

export class InvoiceModule {

    private static invoiceService = new InvoiceService(HttpModule.HttpService());
    private static invoiceManager = new InvoiceManager(CartModule.providers().service, InvoiceModule.invoiceService);

    private static InvoiceManager(): InvoiceManager {
        return InvoiceModule.invoiceManager;
    }

    private static InvoiceService(): InvoiceService {
        return InvoiceModule.invoiceService;
    }

    public static providers(): {manager: InvoiceManager, service: InvoiceService} {
        return {manager: InvoiceModule.InvoiceManager(), service: InvoiceModule.InvoiceService()}
    }
}