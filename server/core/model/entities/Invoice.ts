import { CartItem } from "../valueObjects/CartItem";
import { ShippingAddress } from "../valueObjects/ShippingAddress";



export class Invoice {

    private paid: boolean = false;
    private payment_ref: string | null = null;
    private amount: number = 0;
    private shippingAddress: ShippingAddress | null = null;


    constructor(private id: number | null, private customerId: number, private cartId: number, shippingAddress?: ShippingAddress){
        if(shippingAddress) this.shippingAddress = shippingAddress;
    }
    
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

    public getShippingAddress(): ShippingAddress | null {
        return this.shippingAddress;
    }

    public addShippingAddress(shippingAddress: ShippingAddress): void {
        this.shippingAddress = shippingAddress;
    }

    public getId(): number | null {
        return this.id;
    }
   
}