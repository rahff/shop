export interface ShippingAddressDto {
    numero: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    name: string
}

export interface ConfirmInvoiceCommand {
    token: string;
    cartId: number;
    shippingAddress: ShippingAddressDto;
}
