import { CartItem } from "../valueObjects/CartItem";

export class Invoice {

    private paid: boolean = false;
    private payment_ref: string | null = null;
    private amount: number = 0;

    constructor(private customerId: number, private cartId: number){}
    
    public isPaid(): boolean {
        return this.paid;
    }

    public getAmount(): number {
        return Number(this.amount.toFixed(2));
    }
    
    public computeAmount(cartItem: CartItem[]): void {
        cartItem.forEach((item: CartItem)=> this.amount += item.getAmount());
    }

    public getCartId(): number {
        return this.cartId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getPaymentRef(): string | null {
        return this.payment_ref;
    }
   
}