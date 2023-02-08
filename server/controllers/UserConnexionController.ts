import { Request, Response } from "express";
import { QueryParser } from "../services/QueryParser";
import { serviceLocator } from "../services/ServiceLocator";

export const getLoginViewController = async (_: Request, res: Response) => {
    res.render("login");
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const service = serviceLocator.AccountService();
    const response = await service.loginUser(req.body)
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error.message);
    
    res.status(401).end();
  }
}

export const getRegisterViewController = async (_: Request, res: Response) => {
  res.render("register");
}

export const registerController = async (req: Request, res: Response) => {
  try {
    const service = serviceLocator.AccountService();
    const registeredUser = QueryParser.toUserRegistrationCommand(req.body);
    const response = await service.registerUser(registeredUser);
    res.status(201).json(response);
  } catch (error:any) {
    res.status(400).json({error: error.message})
  }
}

export const getForgotPasswordViewController = async (req: Request, res: Response) => {
  res.render("forgot");
}