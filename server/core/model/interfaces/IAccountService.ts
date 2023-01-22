export interface IAccountService {
    isCustomerAuthenticated(token: string): Promise<number>
}