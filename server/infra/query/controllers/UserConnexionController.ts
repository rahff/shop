import { Request, Response } from "express";
import { IQueryAccount } from "../interfaces/IQueryAccount";


export class QueryUserController {

  constructor(private queryAccount: IQueryAccount){}

  async getLoginView(_: Request, res: Response) {
    res.render("login");
  }

  async login(req: Request, res: Response) {
    try {
      const response = await this.queryAccount.loginUser(req.body)
      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).end();
    }
  }

  async getRegisterView(_: Request, res: Response) {
    res.render("register");
  }

  async getForgotPasswordView(req: Request, res: Response) {
    res.render("forgot");
  }

}