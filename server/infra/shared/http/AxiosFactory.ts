import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosFactory {

    public static getCommandInstance(): AxiosInstance {
        const instance = axios.create({baseURL: process.env.STRAPI_URL});
        instance.interceptors.request.use(this.addApiToken);
        return instance;
    }

    private static addApiToken(request: AxiosRequestConfig<any>): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> {
        request.headers.set("Authorization", `Bearer ${process.env.API_TOKEN}`);
        return request;
    }

    public static getQueryInstance(): AxiosInstance {
        return axios.create({baseURL: process.env.STRAPI_URL});
    }
}