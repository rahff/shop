import { RawAxiosRequestConfig } from "axios";



export interface IAuthHttpService {
    verifyToken<T>(url: string, config: RawAxiosRequestConfig<any> ): Promise<T | null>
    send<T, R>(url: string, body: T): Promise<R>
}