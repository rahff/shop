import { ShippingAddressDto } from "../../command/ConfirmInvoiceCommand";
import { InvoiceDto } from "../../dto/InvoiceDto";
import { Invoice } from "../entities/Invoice";
import { ShippingAddress } from "../valueObjects/ShippingAddress";

export class InvoiceFactory {

    public static from(dto: InvoiceDto): Invoice {
        const shippingAddress = InvoiceFactory.dtoToShippingAddress(dto.shipping_address);
        return new Invoice(dto.id, dto.customerId, dto.cart, shippingAddress);
    }

    public static create(customerId: number, cartId: number): Invoice {
        return new Invoice(null, customerId, cartId);
    }

    private static dtoToShippingAddress(dto: ShippingAddressDto | null): ShippingAddress | undefined {
        return dto ?  ShippingAddress.of(dto) : undefined
    }

}