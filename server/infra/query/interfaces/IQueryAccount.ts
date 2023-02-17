import { UserCredential } from "./UserCredential";

export interface IQueryAccount {
    loginUser(body: UserCredential): Promise<{user: any, jwt: any}> 
}