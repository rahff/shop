import { Entity } from "./Entity";

export interface IPluralResponse<T> {
    data: Entity<T>[]
    meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } }
}