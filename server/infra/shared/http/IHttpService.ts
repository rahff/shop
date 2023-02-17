import { RawAxiosRequestConfig } from "axios"
import { FindOneResponse, FindResponse } from "strapi-adapter"


export interface IHttpService {
    find<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<FindResponse<TResponse> | null> 
    findOne<TResponse>(url: string, config?: RawAxiosRequestConfig<any>): Promise<FindOneResponse<TResponse> | null>
    post<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>>
    put<TData, TResponse>(url: string, data: TData): Promise<FindOneResponse<TResponse>>
}