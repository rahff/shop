import { ShippingAddressDto } from "../core/command/ConfirmInvoiceCommand"

export interface JsonInvoiceOut {
    data: {
        customerId: number,
        cart: number,
        amount: number,
        paid: boolean,
        payment_ref: string | null
    }
}

export interface JsonConfirmedInvoiceOut {
    data: {
        customer: number,
        cart: number,
        amount: number,
        paid: boolean,
        payment_ref: string | null,
        shipping_address: ShippingAddressDto
    }
}