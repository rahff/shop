import { CartDto } from "../../../../core/dto/CartDto";
import { ICartService } from "../../../../core/interfaces/ICartService";
import { CartFactory } from "../../../../core/model/factories/CartFactory";



export class CartServiceStub implements ICartService {
    
    private data: CartDto[] = [ {id: 7, validated: false, items: [], amount: 0, customerId: null}, 
    {id: 5, validated: false, items: [ 
        {product_id: 1, product_name: "test", product_price: 10, image_url: "url", quantity: 1, amount: 10},
        {product_id: 2, product_name: "test2", product_price: 15.99, image_url: "url2", quantity: 1, amount: 15.99}],
         amount: 0, customerId: null} ];

    constructor(){}

    // async validateCart(cart: CartDto): Promise<CartDto> {
    //     const savedCart = await this.saveCart(cart)
    //     return savedCart;
    // }

    async saveCart(cart: CartDto): Promise<CartDto> {
        this.data = this.data.map((i: CartDto) => {
            if(i.id === cart.id){
                i = cart
            }
            return i;
        });
        return cart;
    }

    async getCartOrCreateNewOne(cartId: number): Promise<CartDto> {
        const foundedCart = this.data.find((cart: CartDto)=> cart.id === cartId);
        if(!foundedCart) return CartFactory.from({id: 147, amount: 0, items: [], customerId: null, validated: false}).asDto()
        return foundedCart;
    }

    async getCartOrNothing(cartId: number): Promise<CartDto | null> {
        const foundedCart = this.data.find((cart: CartDto)=> cart.id === cartId );
        if(!foundedCart) return null;
        return foundedCart;
    }
}