import axios, { AxiosInstance } from "axios";
import { HttpService } from "../services/HttpService";



export class HttpModule {

    private static API_URL: string = process.env.API_URL || "http://localhost:1337";
    private static axiosInstance: AxiosInstance = axios.create();
    private static httpService = new HttpService(HttpModule.axiosInstance, HttpModule.API_URL);

    public static HttpService(): HttpService {
        return HttpModule.httpService;
    }
}