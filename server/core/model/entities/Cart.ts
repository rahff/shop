import { CartDto, ValidatedCartDto } from "../../dto/CartDto";
import { CartItemFactory } from "../factories/CartItemFactory";
import { CartItem } from "../valueObjects/CartItem";



export class Cart {

    protected amount: number = 0;
    

    constructor(protected id: number, protected cartItems: CartItem[] = []){
        this.cartItems = cartItems;
    }

    public getId(): number {
        return this.id;
    }
    

    public getItems(): CartItem[] {
        return this.cartItems;
    }

    public isValidated(): boolean {
        return false;
    }

    public getAmount(): number {
        this.amount = 0;
        this.cartItems.forEach((item: CartItem)=>{
            this.amount += item.getAmount();
        })
        return this.amount;
    }

    public asDto(): CartDto {
        return {
            amount: this.getAmount(),
            items: this.cartItems.map((i)=> i.asDto()),
            customerId: null,
            id: this.id,
            validated: false
        }
    }

    public addItem(item: CartItem): void {
        if(!this.isAlreadyInCart(item)){
            this.cartItems.push(item);
        }else{
            this.cartItems.forEach((currentItem: CartItem) => {
                if(currentItem.getProductId() === item.getProductId()){
                    currentItem.incrementQty();
                }
            })
        }
    }
    private isAlreadyInCart(item: CartItem): boolean {
        return !!this.cartItems.find((i)=> i.getProductId() === item.getProductId());
    }

    protected setAmount(amount: number): void {
        this.amount = amount;
    }

    public decrementItem(productId: number): void {
        this.cartItems = this.cartItems.map((item: CartItem)=>{
            if(item.getProductId() === productId) {
                item.decrementQty();
            }
            return item;
        })
    }

    public removeItem(productId: number): void {
        this.cartItems = this.cartItems.filter((i: CartItem) => i.getProductId() !== productId);
    }

}

export class CustomerCart extends Cart {

    constructor(id: number, protected customerId: number, items: CartItem[]) {
        super(id, items);
        this.customerId = customerId;
    }

    public asDto(): CartDto {
        return {
            amount: this.getAmount(),
            items: CartItemFactory.toDtoArray(this.cartItems),
            customerId: this.customerId,
            id: this.id,
            validated: false
        }
    }

    public getCustomerId(): number {
        return this.customerId;
    }
}

export class ValidatedCart extends CustomerCart {

    constructor(id: number, customerId: number, cartItems: CartItem[]){
        super(id, customerId, cartItems)
    }

    public isValidated(): boolean {
        return true;
    }

    public asDto(): ValidatedCartDto {
        return {
            amount: this.getAmount(),
            items: CartItemFactory.toDtoArray(this.cartItems),
            customerId: this.customerId,
            id: this.id,
            validated: true
        }
    }
}