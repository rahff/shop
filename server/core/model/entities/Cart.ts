import { CartItem } from "../valueObjects/CartItem";

export class Cart {
    private amount: number = 0;
    private validated: boolean = false;
    private id: number;
    private cartItems: CartItem[] = [];
    private customerId: number | null = null;

    constructor(id: number, validated: boolean, items: CartItem[]){
        this.validated = validated;
        this.cartItems = items;
        this.id = id;
    }

    public addItem(item: CartItem): void {
        if(!this.isAlreadyInCart(item)){
            this.cartItems.push(item);
        }else{
            this.cartItems.forEach((currentItem: CartItem) => {
                if(currentItem.getProductId() ===  item.getProductId()){
                    currentItem.incrementQty();
                }
            })
        }
    }

    public removeItem(productId: number): void {
        this.cartItems = this.cartItems.filter((i: CartItem) => i.getProductId() !== productId);
    }

    private isAlreadyInCart(item: CartItem): boolean {
        return !!this.cartItems.find((i)=> i.getProductId() === item.getProductId());
    }

    public getItems(): CartItem[] {
        return this.cartItems;
    }

    public getId(): number {
        return this.id;
    }

    public isValidated(): boolean {
        return this.validated;
    }

    public validate(): void {
        this.validated = true;
    }

    public getCustomerId(): number | null {
        return this.customerId;
    }

    public toCustomer(customerId: number): void {
        this.customerId = customerId;
    }

    public decrementItem(productId: number): void {
        this.cartItems = this.cartItems.map((item: CartItem)=>{
            if(item.getProductId() === productId) {
                item.decrementQty();
            }
            return item;
        })
    }

    public getAmount(): number {
        let amount: number = 0;
        this.cartItems.forEach((item: CartItem)=>{
            amount += item.getAmount();
        })
        return amount;
    }
}