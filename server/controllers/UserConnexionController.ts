import { Request, Response } from "express";


export const getLoginViewController = async (_: Request, res: Response) => {
    res.render("login");
}

export const getRegisterViewController = async (_: Request, res: Response) => {
  res.render("register");
}

export const getForgotPasswordViewController = async (req: Request, res: Response) => {
  res.render("forgot");
}