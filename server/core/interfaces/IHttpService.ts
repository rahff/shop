import { IStrapiResponse } from "./IStrapiResponse";

export interface IHttpService {
    getMany<T>(url: string): Promise<IStrapiResponse<T>>;
}