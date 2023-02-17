import { BaseStrapiUser } from "../../infra/command/interfaces/BaseStrapiUser"

export interface IAccountService {
    getUserIdIfAuthenticated(token: string): Promise<number>
    registerUser(body: BaseStrapiUser): Promise<{user: any, jwt: any}>
}