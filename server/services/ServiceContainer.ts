import { GetProduct } from "../core/GetProduct";
import { HttpService } from "./HttpService";
import axios, { AxiosInstance } from "axios"




export class ServiceContainer {

    private static axiosInstance: AxiosInstance = axios.create();
    private static API_URL: string = process.env.API_URL || "http://localhost:1337";

    public static ProductService(): GetProduct {
        return new GetProduct(new HttpService(ServiceContainer.axiosInstance, ServiceContainer.API_URL))
    }
}