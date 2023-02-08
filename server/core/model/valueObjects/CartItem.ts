export class CartItem {

    constructor(private productId: number, 
        private productName: string, 
        private productPrice: number,
        private imageUrl: string, 
        private quantity: number = 1){}

    public getProductId(): number {
        return this.productId;
    }

    public getProductPrice(): number {
        return this.productPrice;
    }

    public getProductName(): string {
        return this.productName;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getAmount(): number {
        return this.quantity * this.productPrice;
    }

    public incrementQty(): void {
        this.quantity ++;
    }

    public decrementQty(): void {
        if(this.quantity > 1){
            this.quantity --;
        }
    }
}