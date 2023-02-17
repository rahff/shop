import axios, { AxiosInstance, AxiosResponse } from "axios";

export class E2ETest {

    private serverUrl: string = "http://localhost:3000/api";
    private loginPath: string = "/auth/local";

    constructor(private http: AxiosInstance) {
        this.http = axios.create()
    }

    public async addCartItem(productId: number, cartId: number, config?: any):Promise<AxiosResponse> { 
        return await this.http.get(this.serverUrl+this.addToCartUrl(productId, cartId), config);
    }

    public async canValidateCart(cartId: number, token: string): Promise<boolean> {
        try {
            await this.http.get(this.serverUrl+`/cart/validate?cartId=${cartId}`, this.headers(token));
            return true;
        } catch (error: any) {
            return false;
        }
    }

    public getUserToken = async (identifier: string): Promise<{user: any, token: string}> => {
        const response = await this.http.post(this.serverUrl+this.loginPath, this.credentials(identifier));
        
        return {user: response.data.user, token: response.data.jwt}
    }

    public async validateCart(cartId: number, token: string): Promise<AxiosResponse> {
        return await this.http.get(this.serverUrl+`/cart/validate?cartId=${cartId}`, this.headers(token));
    }

    public async removeItemOnCart(cartId: number, productId: number): Promise<AxiosResponse>{
        return await this.http.get(this.serverUrl+`/cart/remove-item?cartId=${cartId}&productId=${productId}`);
    }

    public async decrementItemOnCart(cartId: number, productId: number): Promise<AxiosResponse> {
        return await this.http.get(this.serverUrl+`/cart/decrement-item?cartId=${cartId}&productId=${productId}`);
    }

    private addToCartUrl(productId: number, cartId?: number): string {
        return `/cart/add?productId=${productId}&cartId=${cartId?cartId:"0"}`;
    }

    private credentials(identifier: string) {
        return {identifier, password: "strapiPassword"}
    };

    public headers(token: string){ 
        return {headers: {"Authorization": `Bearer ${token}`}};
    };
}
 