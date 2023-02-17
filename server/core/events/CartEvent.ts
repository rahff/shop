export abstract class CartEvent {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}