import { RawAxiosRequestConfig } from "axios"

export interface IHttpService {
    get<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<TResponse | null> 
    post<TResponse, TData>(url: string, data: TData): Promise<TResponse>
    put<TResponse, TData>(url: string, data: TData): Promise<TResponse>
}