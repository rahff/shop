import { IInvoiceManager } from "../../shared/IInvoiceManager";
import { ConfirmInvoiceCommand } from "../command/ConfirmInvoiceCommand";
import { CartDto, ValidatedCartDto } from "../dto/CartDto";
import { InvoiceDto } from "../dto/InvoiceDto";
import { IAccountService } from "../interfaces/IAccountService";
import { ICartService } from "../interfaces/ICartService";
import { IInvoiceService } from "../interfaces/IInvoiceService";
import { Invoice } from "../model/entities/Invoice";
import { CartItemFactory } from "../model/factories/CartItemFactory";
import { InvoiceFactory } from "../model/factories/InvoiceFactory";
import { ShippingAddress } from "../model/valueObjects/ShippingAddress";

export class InvoiceManager implements IInvoiceManager{

    constructor(private invoiceService: IInvoiceService, private accountService: IAccountService){}
    
    

    async confirmInvoice(command: ConfirmInvoiceCommand): Promise<InvoiceDto> {
        const userId = await this.accountService.getUserIdIfAuthenticated(command.token);
        if(!userId) throw new Error("401 unauthorized");
        const confirmedInvoice = await this.invoiceService.getInvoiceByCartId(command.cartId);
        if(!confirmedInvoice) throw new Error("404 invoice not found");
        const invoice = InvoiceFactory.from(confirmedInvoice)
        invoice.addShippingAddress(ShippingAddress.of(command.shippingAddress));
        const savedInvoice = await this.invoiceService.save(invoice.asDto());
        return savedInvoice;
    }
}