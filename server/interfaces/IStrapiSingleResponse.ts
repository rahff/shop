import { Entity } from "../core/model/interfaces/Entity";

export interface IStrapiSingleResponse<T> {
    data: Entity<T>
}