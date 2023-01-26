export class Product {
    
    constructor(private id: number, private name: string, private price: number,
                private images: string, private packaging: string){}

    public getName() : string {
        return this.name;
    }

    public getImage() : string {
        return this.images;
    }

    public getPackaging() : string {
        return this.packaging;
    }

    public getPrice() : number {
        return this.price;
    }

    public getId(): number {
        return this.id;
    }
}