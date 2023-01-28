export interface JsonInvoiceOut {
    customer: number,
    cart: number,
    amount: number,
    paid: boolean,
    payment_ref: string | null
}