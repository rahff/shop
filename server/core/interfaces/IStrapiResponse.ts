import { Entity } from "./Entity";

export interface IStrapiResponse<T> {
    data: Entity<T>[]
    meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } }
}