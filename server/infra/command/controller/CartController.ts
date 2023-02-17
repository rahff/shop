import { Request, Response } from "express";
import { ICartManager } from "../../../shared/ICartManger";
import { IEventBus } from "../../../shared/IEventBus";
import { QueryParser } from "../services/QueryParser";



export class CartController {

    constructor(private cartManager: ICartManager, private eventBus: IEventBus){}

    async addCartItemController(req: Request, res: Response) {
        try {
            const command = QueryParser.toAddProductCartCommand(req.query, req.headers);
            const cart = await this.cartManager.addCartItem(command);
            res.status(201).json({cart});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async removeCartItemController(req: Request, res: Response) {
        try {
            const command = QueryParser.toRemoveItemCartCommand(req.query);
            const cart = await this.cartManager.removeCartItem(command);
            res.status(201).json({cart});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
    async decrementCartItemController(req: Request, res: Response) {
        try {
            const command = QueryParser.toDecrementItemCartCommand(req.query);
            const cart = await this.cartManager.decrementCartItem(command);
            res.status(201).json({cart});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async validateCartController(req: Request, res: Response) {
        try {
            const command = QueryParser.toValidateCartCommand(req.query, req.headers);
            const cartValidatedEvent = await this.cartManager.validateCart(command);
            this.eventBus.dispatch(cartValidatedEvent);
            res.status(200).end();
        } catch (error: any) {
            res.status(400).end();
        }
    }
}


