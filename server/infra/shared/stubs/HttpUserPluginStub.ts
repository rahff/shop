import { RawAxiosRequestConfig } from "axios";
import { readFileSync } from "fs";
import { resolve } from "path";
import { IAuthHttpService } from "../http/IAuthHttp";

export class HttpUserPluginStub implements IAuthHttpService {
   
    private baseUrl = "../../../../data/";

    async verifyToken<T>(url: string, config: RawAxiosRequestConfig<any>): Promise<T> {
        const userJson = this.loadFile(`${this.baseUrl}authenticate.json`);
        return JSON.parse(userJson);
    }
    
    async send<T, R>(url: string, body: T): Promise<R> {
        switch (url) {
            case "/api/auth/local/register":
                const registerResponse = this.loadFile(`${this.baseUrl}register.json`);
                return JSON.parse(registerResponse);

            case "/api/auth/local":
                const loginResponse = this.loadFile(`${this.baseUrl}login.json`)
                return JSON.parse(loginResponse);
                
            default: throw new Error("404 not found");
        }
    }

    private loadFile(path: string): string {
        return readFileSync(resolve(__dirname, "../data/"+path), {encoding: "utf8"});
    }
}