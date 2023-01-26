import { Entity } from "./Entity";

export interface IStrapiSingleResponse<T> {
    data: Entity<T>
}