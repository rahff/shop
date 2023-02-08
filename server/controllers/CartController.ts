import { Request, Response } from "express";
import { EntityMapper } from "../services/EntityMapper";
import { QueryParser } from "../services/QueryParser";
import { serviceLocator } from "../services/ServiceLocator";



export const addCartItemController = async (req: Request, res: Response)=> {
    try {
        const service = serviceLocator.CartManager();   
        const command = QueryParser.toAddProductCartCommand(req.query, req.headers);
        const cart = await service.addCartItem(command);
        const responseData = EntityMapper.cartToJsonOut(cart);
        res.status(201).json({cart: responseData.data});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const removeCartItemController = async (req: Request, res: Response)=> {
    try {
        const service = serviceLocator.CartManager();
        const command = QueryParser.toRemoveItemCartCommand(req.query);
        const cart = await service.removeCartItem(command);
        res.status(201).json({cart});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const decrementCartItemController = async (req: Request, res: Response)=> {
    try {
        const service = serviceLocator.CartManager();
        const command = QueryParser.toDecrementItemCartCommand(req.query);
        const cart = await service.decrementCartItem(command);
        res.status(201).json({cart});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const getCartController = async (req: Request, res: Response)=> {
    try {
        const service = serviceLocator.CartService();
        const cart = await service.getCartOrNothing(Number(req.params.id));
        if(!cart) return res.status(404).json({message: "not found"});
        res.status(200).json({cart});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const getCartViewController = async (req: Request, res: Response) => {
    const cartId = Number(req.query["cartId"]);
    const service = serviceLocator.CartService();
    const cart = await service.getCartOrNothing(cartId);
    if(cart) {
        const cartViewModel = EntityMapper.cartToJsonOut(cart)
        res.render("cart", { cart: cartViewModel.data });
    }
    res.render("cart", {cart: null})
}

export const validateCartController = async (req: Request, res: Response) =>{
    try {
        const command = QueryParser.toValidateCartCommand(req.query, req.headers);
        const service = serviceLocator.CartManager();
        const isValidated = await service.validateCart(command);
        if(isValidated){ 
            res.status(200).json({validated: isValidated})
        } else { res.status(403).json({validated: isValidated}) };
    } catch (error: any) {
        res.status(400).end();
    }
}


