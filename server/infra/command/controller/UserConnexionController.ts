import { IAccountService } from "../../../core/interfaces/IAccountService";
import { Request, Response } from "express";
import { QueryParser } from "../services/QueryParser";


export class UserConnexionController {

  constructor(private accountService: IAccountService){}

  async registerController(req: Request, res: Response) {
    try {
      const registeredUser = QueryParser.toUserRegistrationCommand(req.body);
      const response = await this.accountService.registerUser(registeredUser);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({error: error.message})
    }
  }
}