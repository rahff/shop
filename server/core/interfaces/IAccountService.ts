export interface IAccountService {
    getUserIdIfAuthenticated(token: string): Promise<number>
}