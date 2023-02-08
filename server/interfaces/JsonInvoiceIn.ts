import { ShippingAddressDto } from "../core/command/ConfirmInvoiceCommand";


export interface JsonInvoiceIn {
    customerId: number,
    cart: number,
    amount: number,
    paid: boolean,
    payment_ref: string | null,
    shipping_address: ShippingAddressDto | null
}