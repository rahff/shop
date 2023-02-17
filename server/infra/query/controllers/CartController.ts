import { Request, Response } from "express";
import { IQueryCart } from "../interfaces/IQueryCart";


export class QueryCartController {

    constructor(private queryCart: IQueryCart){}

    async getCart(req: Request, res: Response) {
        try {
        
            const cart = await this.queryCart.getCartById(Number(req.params.id));
            if(!cart) return res.status(404).json({message: "not found"});
            res.status(200).json({cart});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getCartView(req: Request, res: Response) {
        const cartId = Number(req.query["cartId"]);
        const cart = await this.queryCart.getCartById(cartId);
        if(cart) {
            res.render("cart", { cart });
        }
        res.render("cart", {cart: null})
    }
}





