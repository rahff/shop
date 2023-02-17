import { ConfirmInvoiceCommand } from "../core/command/ConfirmInvoiceCommand";
import { InvoiceDto } from "../core/dto/InvoiceDto";


export interface IInvoiceManager {
    confirmInvoice(command: ConfirmInvoiceCommand): Promise<InvoiceDto>
}