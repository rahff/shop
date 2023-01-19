export interface IHttpService {
    get<TResponse>(url: string): Promise<TResponse>
}