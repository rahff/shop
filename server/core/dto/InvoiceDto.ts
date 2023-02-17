import { ShippingAddressDto } from "../command/ConfirmInvoiceCommand";

export interface InvoiceDto {
    paid: boolean;
    payment_ref: string | null
    amount: number;
    shipping_address: ShippingAddressDto | null;
    id: number | null, 
    customerId: number, 
    cart: number, 
}